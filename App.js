// Ana Uygulama Bileşeni: Ekranlar Arası Geçişi Yöneten Kök Bileşen

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

// Uygulama Durumlarını Tanımlayan Sabitler
const SCREENS = {
    HOME: 'home',
    GAME: 'game',
};

// Kök Uygulama Bileşeni
export default function App() {
    // Mevcut Ekranı Takip Eden State Değişkeni
    const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);

    // Ana Menüden Oyun Ekranına Geçiş Fonksiyonu
    const handlePlay = () => {
        setCurrentScreen(SCREENS.GAME);
    };

    // Oyun Ekranından Ana Menüye Dönüş Fonksiyonu
    const handleHome = () => {
        setCurrentScreen(SCREENS.HOME);
    };

    return (
        <View style={styles.container}>
            {/* Durum Çubuğunu Gizleme */}
            <StatusBar hidden />

            {/* Mevcut Ekrana Göre İlgili Bileşeni Render Etme */}
            {currentScreen === SCREENS.HOME ? (
                <HomeScreen onPlay={handlePlay} />
            ) : (
                <GameScreen onHome={handleHome} />
            )}
        </View>
    );
}

// Kök Bileşen Stil Tanımları
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
