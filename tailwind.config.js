export default {
    theme: {
        extend: {
            keyframes: {
            marquee: {
                '0%': { transform: 'translateY(0%)' },
                '100%': { transform: 'translateY(-50%)' }
            }
            },
            animation: {
                marquee: 'marquee 20s linear infinite'
            }
        }
    }
};
