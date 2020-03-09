export const PAGE_SIZE = 20;
export const SARATOV_CENTER_COORDS = { latitude: 51.537996, longitude: 46.0225103 };
export const DATE_FORMAT = 'DD/MM/YYYY';

export const OBJECT_TYPES = {
    1: { label: 'Федеральный', value: 1, colorName: 'volcano', colorCode: '#fa541c' },
    2: { label: 'Региональный', value: 2, colorName: 'cyan', colorCode: '#13c2c2' },
    // 3: { label: 'Неизвестный', value: 3, colorName: 'grey', colorCode: '' },
    4: { label: 'Муниципальный', value: 4, colorName: 'green', colorCode: '#52c41a' },
    5: { label: 'Выявленный', value: 5, colorName: 'purple', colorCode: '#722ed1' },
    10: { label: 'Исключенный', value: 10, colorName: 'gold', colorCode: '#faad14' },
    100: { label: 'Утраченный', value: 100, colorName: 'geekblue', colorCode: '#2f54eb' }
};

export const VIEW_TYPES = {
    MAP: 'MAP',
    LIST: 'LIST'
};
