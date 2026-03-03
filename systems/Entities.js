// Oyun Varlıklarını (Entity) Oluşturan Yardımcı Fonksiyon

import CONSTANTS from '../utils/constants';

// Oyun Başlangıcında Tüm Varlıkları Oluşturan ve Döndüren Fonksiyon
const createEntities = () => {
    // Kuşun Başlangıç Durumunu Ayarlama
    const bird = {
        position: { x: CONSTANTS.BIRD_X, y: CONSTANTS.BIRD_Y },
        velocity: { x: 0, y: 0 },
        width: CONSTANTS.BIRD_WIDTH,
        height: CONSTANTS.BIRD_HEIGHT,
        renderer: 'Bird',
    };

    // Zeminin Başlangıç Durumunu Ayarlama
    const ground = {
        position: { x: CONSTANTS.SCREEN_WIDTH / 2, y: CONSTANTS.SCREEN_HEIGHT - CONSTANTS.GROUND_HEIGHT / 2 },
        width: CONSTANTS.SCREEN_WIDTH * 2,
        height: CONSTANTS.GROUND_HEIGHT,
        renderer: 'Ground',
    };

    return {
        bird,
        ground,
    };
};

export default createEntities;
