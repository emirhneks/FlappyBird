// Oyun Ekranı: Ana Oyun Döngüsünün Çalıştığı ve Tüm Oyun Mekaniğinin Yönetildiği Ekran

import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Bird from '../components/Bird';
import Pipe from '../components/Pipe';
import Ground from '../components/Ground';
import Physics, { resetPhysics } from '../systems/Physics';
import CONSTANTS from '../utils/constants';

// Oyun Varlıklarını Renderer Bileşenleriyle Birlikte Oluşturan Fonksiyon
const createGameEntities = () => {
    return {
        // Kuş Varlığı: Pozisyon, Hız ve Renderer Bilgileri
        bird: {
            position: { x: CONSTANTS.BIRD_X, y: CONSTANTS.BIRD_Y },
            velocity: { x: 0, y: 0 },
            width: CONSTANTS.BIRD_WIDTH,
            height: CONSTANTS.BIRD_HEIGHT,
            body: {
                position: { x: CONSTANTS.BIRD_X, y: CONSTANTS.BIRD_Y },
                velocity: { x: 0, y: 0 },
            },
            renderer: <Bird />,
        },

        // Zemin Varlığı: Pozisyon ve Renderer Bilgileri
        ground: {
            position: {
                x: CONSTANTS.SCREEN_WIDTH / 2,
                y: CONSTANTS.SCREEN_HEIGHT - CONSTANTS.GROUND_HEIGHT / 2,
            },
            width: CONSTANTS.SCREEN_WIDTH * 2,
            height: CONSTANTS.GROUND_HEIGHT,
            renderer: <Ground />,
        },
    };
};

// Ana Oyun Ekranı Bileşeni
const GameScreen = ({ onHome }) => {
    // Oyun Durumunu Takip Eden State Değişkenleri
    const [running, setRunning] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameKey, setGameKey] = useState(0);

    // Oyun Motoru Referansı
    const gameEngine = useRef(null);

    // Oyun Motorundan Gelen Olayları İşleyen Fonksiyon
    const onEvent = useCallback((e) => {
        if (e.type === 'game-over') {
            // Oyun Bitti Durumunda Motoru Durdurma
            setRunning(false);
            setGameOver(true);
        } else if (e.type === 'score') {
            // Skor Artışı Olayını İşleme
            setScore((prev) => prev + 1);
        }
    }, []);

    // Oyunu Sıfırlayarak Yeniden Başlatan Fonksiyon
    const resetGame = useCallback(() => {
        resetPhysics();
        setScore(0);
        setGameOver(false);
        setRunning(true);
        // GameEngine'i Yeniden Oluşturmak için Key Değerini Değiştirme
        setGameKey((prev) => prev + 1);
    }, []);

    return (
        <View style={styles.container}>
            {/* Gökyüzü Arka Planı */}
            <View style={styles.skyBackground} />

            {/* Dokunma/Tıklama Haznesi: Web ve Mobil Uyumluluğu için Saydam Bir Örtü */}
            <TouchableWithoutFeedback
                onPress={() => {
                    if (running && gameEngine.current) {
                        gameEngine.current.dispatch({ type: 'jump' });
                    }
                }}
            >
                <View style={StyleSheet.absoluteFillObject}>
                    {/* Oyun Motoru: Tüm Varlıkların Render Edildiği ve Fiziğin Çalıştığı Alan */}
                    <GameEngine
                        key={gameKey}
                        ref={gameEngine}
                        style={styles.gameEngine}
                        systems={[Physics]}
                        entities={createGameEntities()}
                        running={running}
                        onEvent={onEvent}
                    />
                </View>
            </TouchableWithoutFeedback>

            {/* Skor Göstergesi */}
            <View style={styles.scoreContainer} pointerEvents="none">
                <Text style={styles.scoreShadow}>{score}</Text>
                <Text style={styles.scoreText}>{score}</Text>
            </View>

            {/* Başlamadan Önce Bilgilendirme Mesajı */}
            {!gameOver && score === 0 && (
                <View style={styles.tapHintContainer} pointerEvents="none">
                    <Text style={styles.tapHintText}>Başlamak için Dokun</Text>
                </View>
            )}

            {/* Oyun Bitti Ekranı */}
            {gameOver && (
                <View style={styles.overlay}>
                    <View style={styles.gameOverCard}>
                        {/* Oyun Bitti Başlığı */}
                        <Text style={styles.gameOverTitle}>Oyun Bitti</Text>

                        {/* Final Skor Gösterimi */}
                        <View style={styles.scoreDisplay}>
                            <Text style={styles.scoreLabel}>Skor</Text>
                            <Text style={styles.finalScore}>{score}</Text>
                        </View>

                        {/* Tekrar Oyna Butonu */}
                        <TouchableOpacity style={styles.retryButton} onPress={resetGame} activeOpacity={0.7}>
                            <Text style={styles.retryButtonText}>Tekrar Oyna</Text>
                        </TouchableOpacity>

                        {/* Ana Menüye Dön Butonu */}
                        <TouchableOpacity style={styles.homeButton} onPress={onHome} activeOpacity={0.7}>
                            <Text style={styles.homeButtonText}>Ana Menü</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

// Oyun Ekranına Ait Stil Tanımları
const styles = StyleSheet.create({
    // Ana Kapsayıcı
    container: {
        flex: 1,
    },

    // Gökyüzü Arka Planı
    skyBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: CONSTANTS.COLORS.SKY_TOP,
    },

    // Oyun Motoru Alanı
    gameEngine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    // Skor Göstergesi Konteyneri
    scoreContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
    },

    // Skor Gölge Efekti
    scoreShadow: {
        fontSize: 56,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.SCORE_STROKE,
        position: 'absolute',
        top: 2,
        textAlign: 'center',
    },

    // Skor Yazısı
    scoreText: {
        fontSize: 56,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.WHITE,
        textAlign: 'center',
        textShadowColor: CONSTANTS.COLORS.SCORE_STROKE,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },

    // Başlangıç Bildirimi Konteyneri
    tapHintContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Başlangıç Bildirim Yazısı
    tapHintText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.WHITE,
        textShadowColor: CONSTANTS.COLORS.SCORE_STROKE,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        marginTop: 100,
    },

    // Oyun Bitti Yarı Saydam Örtüsü
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: CONSTANTS.COLORS.OVERLAY,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Oyun Bitti Kartı
    gameOverCard: {
        backgroundColor: CONSTANTS.COLORS.WHITE,
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 40,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        borderWidth: 3,
        borderColor: CONSTANTS.COLORS.GROUND_BOTTOM,
    },

    // Oyun Bitti Başlık Yazısı
    gameOverTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.SCORE_STROKE,
        marginBottom: 20,
    },

    // Skor Gösterim Alanı
    scoreDisplay: {
        alignItems: 'center',
        marginBottom: 25,
        backgroundColor: '#F5F0E1',
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: CONSTANTS.COLORS.GROUND_BOTTOM,
    },

    // Skor Etiketi
    scoreLabel: {
        fontSize: 16,
        color: CONSTANTS.COLORS.SCORE_STROKE,
        fontWeight: '600',
    },

    // Final Skor Değeri
    finalScore: {
        fontSize: 42,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.SCORE_STROKE,
    },

    // Tekrar Oyna Butonu
    retryButton: {
        backgroundColor: '#5DBE3F',
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: '#3E8E28',
        borderBottomWidth: 5,
        marginBottom: 12,
        minWidth: 200,
    },

    // Tekrar Oyna Buton Yazısı
    retryButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.WHITE,
        textAlign: 'center',
        textShadowColor: '#3E8E28',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },

    // Ana Menü Butonu
    homeButton: {
        backgroundColor: '#E87D3E',
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 3,
        borderColor: '#C45D20',
        borderBottomWidth: 5,
        minWidth: 200,
    },

    // Ana Menü Buton Yazısı
    homeButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: CONSTANTS.COLORS.WHITE,
        textAlign: 'center',
        textShadowColor: '#C45D20',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default GameScreen;
