export const COLORS = {
    GRAY: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        100: "#E0E0E0",
        200: "#C2C2C2",
        300: "#A3A3A3",
        400: "#858585",
        500: "#666666",
        600: "#4D4D4D",
        700: "#333333",
        800: "#1A1A1A",
        900: "#0A0A0A",
        1000: "#000000",
    },
    PRIMARY: {
        50: `#E6FBFF`,
        100: "#CCF7FE",
        200: "#99EEFD",
        300: "#66E6FC",
        400: "#33DDFB",
        500: "#00D5FA",
        600: "#00A0BC",
        700: "#006B7D",
        800: "#00353F",
        900: "#001519",
    }
}

export interface CustomThemeInterface {
    pallete: {
        mode: string,
        primary: {
            dark: string,
            main: string,
            light: string
        },
        neutral: {
            dark: string,
            main: string,
            mediumMain: string,
            medium: string,
            light: string
        },
        background: {
            default: string,
            alternative: string
        }
    },
    typography: {
        fontFamily: string,
        fontSize: number,
        h1: {
            fontFamily: string,
            fontSize: number,
        },
        h2: {
            fontFamily: string,
            fontSize: number,
        },
        h3: {
            fontFamily: string,
            fontSize: number,
        },
        h4: {
            fontFamily: string,
            fontSize: number,
        },
        h5: {
            fontFamily: string,
            fontSize: number,
        },
        h6: {
            fontFamily: string,
            fontSize: number,
        }
    }
}

export function themeSettings(mode: any): CustomThemeInterface {
    return {
        pallete: {
            mode: mode,
            ...(mode == "dark" ? {
                primary: {
                    dark: COLORS.PRIMARY[200],
                    main: COLORS.PRIMARY[500],
                    light: COLORS.PRIMARY[800]
                },
                neutral: {
                    dark: COLORS.GRAY[100],
                    main: COLORS.GRAY[200],
                    mediumMain: COLORS.GRAY[300],
                    medium: COLORS.GRAY[400],
                    light: COLORS.GRAY[700]
                },
                background: {
                    default: COLORS.GRAY[900],
                    alternative: COLORS.GRAY[800]
                }
            } : {
                primary: {
                    dark: COLORS.PRIMARY[700],
                    main: COLORS.PRIMARY[500],
                    light: COLORS.PRIMARY[50]
                },
                neutral: {
                    dark: COLORS.GRAY[700],
                    main: COLORS.GRAY[500],
                    mediumMain: COLORS.GRAY[400],
                    medium: COLORS.GRAY[300],
                    light: COLORS.GRAY[50],
                },
                background: {
                    default: COLORS.GRAY[10],
                    alternative: COLORS.GRAY[0]
                }
            })
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14
            }
        }
    }
}