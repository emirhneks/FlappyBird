// Fizik Sistemi: Oyun Döngüsünde Her Kare için Çalışan Ana Güncelleme Fonksiyonu

import React from 'react';
import CONSTANTS from '../utils/constants';
import Pipe from '../components/Pipe';

// Boru Oluşturma Sayacı
let pipeCounter = 0;
// Geçilen Boruları Takip Eden Dizi
let passedPipes = [];
// Benzersiz Boru Kimliği için Sayaç
let pipeIdCounter = 0;
// Oyun Başlamış mı Kontrolü (İlk Dokunmayı Bekleyen Bayrak)
let gameStarted = false;

// Oyun Motorunun Her Karesinde Çağrılan Fizik Güncelleme Fonksiyonu
const Physics = (entities, { touches, time, dispatch, events }) => {
    // Kuş Varlığını Alma
    const bird = entities.bird;
    if (!bird) return entities;

    // Dokunma, Tıklama veya Özel Zıplama Olaylarını Dinleme
    const presses = [
        ...touches.filter((t) => t.type === 'press' || t.type === 'start'),
        ...events.filter((e) => e.type === 'jump'),
    ];

    // İlk Dokunma ile Oyunu Başlatma
    if (!gameStarted) {
        if (presses.length > 0) {
            gameStarted = true;
            bird.velocity.y = CONSTANTS.JUMP_FORCE;
        }
        return entities;
    }

    // Dokunma Olaylarını Dinleyerek Kuşu Zıplatma
    presses.forEach(() => {
        bird.velocity.y = CONSTANTS.JUMP_FORCE;
    });

    // Yerçekimini Kuşun Hızına Uygulama
    bird.velocity.y += CONSTANTS.GRAVITY;

    // Kuşun Pozisyonunu Hıza Göre Güncelleme
    bird.position.y += bird.velocity.y;

    // Body Nesnesini Pozisyon ve Hız ile Senkronize Etme
    bird.body.position.x = bird.position.x;
    bird.body.position.y = bird.position.y;
    bird.body.velocity.y = bird.velocity.y;

    // Zeminin Üst Kenarı ile Çarpışma Kontrolü
    const groundTop = CONSTANTS.SCREEN_HEIGHT - CONSTANTS.GROUND_HEIGHT;
    if (bird.position.y + CONSTANTS.BIRD_HEIGHT / 2 >= groundTop) {
        // Oyun Bitti Olayını Tetikleme
        dispatch({ type: 'game-over' });
        return entities;
    }

    // Ekranın Üst Kenarı ile Çarpışma Kontrolü
    if (bird.position.y - CONSTANTS.BIRD_HEIGHT / 2 <= 0) {
        bird.position.y = CONSTANTS.BIRD_HEIGHT / 2;
        bird.velocity.y = 0;
        // Body Nesnesini Güncelleme
        bird.body.position.y = bird.position.y;
        bird.body.velocity.y = bird.velocity.y;
    }

    // Boru Oluşturma Sayacını Artırma
    pipeCounter++;

    // Belirli Aralıklarla Yeni Boru Çifti Oluşturma
    if (pipeCounter % CONSTANTS.PIPE_SPAWN_INTERVAL === 0) {
        // Boşluğun Dikey Konumunu Rastgele Belirleme
        const minGapTop = 100;
        const maxGapTop = groundTop - CONSTANTS.PIPE_GAP - 100;
        const gapTop = Math.random() * (maxGapTop - minGapTop) + minGapTop;

        // Üst Borunun Yüksekliğini Hesaplama
        const topPipeHeight = gapTop;
        // Alt Borunun Yüksekliğini Hesaplama
        const bottomPipeHeight = groundTop - gapTop - CONSTANTS.PIPE_GAP;

        // Benzersiz Boru Kimliği Oluşturma
        const pipeId = pipeIdCounter++;

        // Üst Boru Varlığını Oluşturma
        entities[`pipeTop_${pipeId}`] = {
            position: {
                x: CONSTANTS.SCREEN_WIDTH + CONSTANTS.PIPE_WIDTH / 2,
                y: topPipeHeight / 2,
            },
            body: {
                position: {
                    x: CONSTANTS.SCREEN_WIDTH + CONSTANTS.PIPE_WIDTH / 2,
                    y: topPipeHeight / 2,
                },
                width: CONSTANTS.PIPE_WIDTH,
                height: topPipeHeight,
            },
            width: CONSTANTS.PIPE_WIDTH,
            height: topPipeHeight,
            isTop: true,
            pipeId: pipeId,
            renderer: <Pipe />,
        };

        // Alt Boru Varlığını Oluşturma
        entities[`pipeBottom_${pipeId}`] = {
            position: {
                x: CONSTANTS.SCREEN_WIDTH + CONSTANTS.PIPE_WIDTH / 2,
                y: gapTop + CONSTANTS.PIPE_GAP + bottomPipeHeight / 2,
            },
            body: {
                position: {
                    x: CONSTANTS.SCREEN_WIDTH + CONSTANTS.PIPE_WIDTH / 2,
                    y: gapTop + CONSTANTS.PIPE_GAP + bottomPipeHeight / 2,
                },
                width: CONSTANTS.PIPE_WIDTH,
                height: bottomPipeHeight,
            },
            width: CONSTANTS.PIPE_WIDTH,
            height: bottomPipeHeight,
            isTop: false,
            pipeId: pipeId,
            renderer: <Pipe />,
        };
    }

    // Tüm Boruları Sola Doğru Hareket Ettirme ve Çarpışma Kontrolü Yapma
    Object.keys(entities).forEach((key) => {
        if (key.startsWith('pipe')) {
            const pipe = entities[key];
            // Boruyu Sola Kaydırma
            pipe.position.x -= CONSTANTS.PIPE_SPEED;

            // Body Nesnesini Pozisyonla Senkronize Etme
            pipe.body.position.x = pipe.position.x;

            // Kuş ile Boru Arasında Çarpışma Olup Olmadığını Kontrol Etme
            const birdLeft = bird.position.x - CONSTANTS.BIRD_WIDTH / 2;
            const birdRight = bird.position.x + CONSTANTS.BIRD_WIDTH / 2;
            const birdTop = bird.position.y - CONSTANTS.BIRD_HEIGHT / 2;
            const birdBottom = bird.position.y + CONSTANTS.BIRD_HEIGHT / 2;

            const pipeLeft = pipe.position.x - pipe.width / 2;
            const pipeRight = pipe.position.x + pipe.width / 2;
            const pipeTop = pipe.position.y - pipe.height / 2;
            const pipeBottom = pipe.position.y + pipe.height / 2;

            // AABB (Eksen Hizalı Sınırlayıcı Kutu) Çarpışma Algoritması
            if (
                birdRight > pipeLeft &&
                birdLeft < pipeRight &&
                birdBottom > pipeTop &&
                birdTop < pipeBottom
            ) {
                dispatch({ type: 'game-over' });
                return;
            }

            // Kuş Boruyu Geçtiğinde Skoru Artırma
            if (
                key.startsWith('pipeTop_') &&
                !passedPipes.includes(pipe.pipeId) &&
                pipe.position.x + pipe.width / 2 < bird.position.x - CONSTANTS.BIRD_WIDTH / 2
            ) {
                passedPipes.push(pipe.pipeId);
                dispatch({ type: 'score' });
            }

            // Ekran Dışına Çıkan Boruları Silme
            if (pipe.position.x < -pipe.width) {
                delete entities[key];
            }
        }
    });

    return entities;
};

// Fizik Sistemini Sıfırlayan Fonksiyon (Yeni Oyun Başlatılırken Kullanılır)
export const resetPhysics = () => {
    pipeCounter = 0;
    passedPipes = [];
    pipeIdCounter = 0;
    gameStarted = false;
};

export default Physics;
