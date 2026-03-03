// Oyun Genelinde Kullanılan Sabit Değerler ve Yapılandırma Ayarları

import { Dimensions } from 'react-native';

// Ekran Boyutlarını Almak için Dimensions API Kullanımı
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Oyun Dünyasına Ait Sabit Değerler
const CONSTANTS = {
    // Ekran Boyutları
    SCREEN_WIDTH,
    SCREEN_HEIGHT,

    // Kuşa Ait Fiziksel Özellikler
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30,
    BIRD_X: SCREEN_WIDTH * 0.25,
    BIRD_Y: SCREEN_HEIGHT * 0.4,

    // Yerçekimi ve Zıplama Kuvveti Değerleri
    GRAVITY: 0.4,
    JUMP_FORCE: -8,

    // Borulara Ait Özellikler
    PIPE_WIDTH: 60,
    PIPE_GAP: 180,
    PIPE_SPEED: 3,
    PIPE_SPAWN_INTERVAL: 120,

    // Zemine Ait Özellikler
    GROUND_HEIGHT: 80,

    // Renk Paleti
    COLORS: {
        SKY_TOP: '#4DC9F6',
        SKY_BOTTOM: '#70E1F5',
        BIRD_BODY: '#F5D63D',
        BIRD_WING: '#F0A830',
        BIRD_BEAK: '#E8471A',
        BIRD_EYE_WHITE: '#FFFFFF',
        BIRD_EYE_BLACK: '#000000',
        PIPE_BODY: '#5DBE3F',
        PIPE_BORDER: '#3E8E28',
        PIPE_HIGHLIGHT: '#7ED957',
        GROUND_TOP: '#DEB887',
        GROUND_BOTTOM: '#C4965A',
        GROUND_GRASS: '#5DBE3F',
        WHITE: '#FFFFFF',
        BLACK: '#000000',
        OVERLAY: 'rgba(0,0,0,0.5)',
        SCORE_STROKE: '#543847',
    },
};

export default CONSTANTS;
