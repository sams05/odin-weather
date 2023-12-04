// |Assets
// Adapted from https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
// |Todo add LICENSE file for google fonts https://fonts.google.com/icons?icon.query=weather
export const WEATHER_CODE_MAPPING = {
    0: {
        day: {
            description: 'Sunny',
            image: 'https://images.pexels.com/photos/666839/pexels-photo-666839.jpeg',
            iconFont: 'sunny'
        },
        night: {
            description: 'Clear',
            image: 'https://images.pexels.com/photos/6985116/pexels-photo-6985116.jpeg',
            iconFont: 'clear_night'
        }
    },
    1: {
        day: {
            description: 'Mostly Sunny',
            image: 'https://images.pexels.com/photos/1054220/pexels-photo-1054220.jpeg',
            iconFont: 'partly_cloudy_day'
        },
        night: {
            description: 'Mostly Clear',
            image: 'https://images.pexels.com/photos/6272237/pexels-photo-6272237.jpeg',
            iconFont: 'partly_cloudy_night'
        }
    },
    2: {
        day: {
            description: 'Partly Cloudy',
            image: 'https://images.pexels.com/photos/1054221/pexels-photo-1054221.jpeg',
            iconFont: 'partly_cloudy_day'
        },
        night: {
            description: 'Partly Cloudy',
            image: 'https://images.pexels.com/photos/3750779/pexels-photo-3750779.jpeg',
            iconFont: 'partly_cloudy_night'
        }
    },
    3: {
        day: {
            description: 'Cloudy',
            image: 'https://images.pexels.com/photos/1622513/pexels-photo-1622513.jpeg',
            iconFont: 'cloud'
        },
        night: {
            description: 'Cloudy',
            image: 'https://images.pexels.com/photos/416920/pexels-photo-416920.jpeg',
            iconFont: 'cloud'
        }
    },
    45: {
        day: {
            description: 'Foggy',
            image: 'https://images.pexels.com/photos/226460/pexels-photo-226460.jpeg',
            iconFont: 'foggy'
        },
        night: {
            description: 'Foggy',
            image: 'https://images.pexels.com/photos/6494669/pexels-photo-6494669.jpeg',
            iconFont: 'foggy'
        }
    },
    48: {
        day: {
            description: 'Foggy',
            image: 'https://images.pexels.com/photos/226460/pexels-photo-226460.jpeg',
            iconFont: 'foggy'
        },
        night: {
            description: 'Foggy',
            image: 'https://images.pexels.com/photos/6494669/pexels-photo-6494669.jpeg',
            iconFont: 'foggy'
        }
    },
    51: {
        day: {
            description: 'Light Drizzle',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Light Drizzle',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    53: {
        day: {
            description: 'Moderate Drizzle',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Moderate Drizzle',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    55: {
        day: {
            description: 'Heavy Drizzle',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Heavy Drizzle',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    56: {
        day: {
            description: 'Light Freezing Drizzle',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'weather_mix'
        },
        night: {
            description: 'Light Freezing Drizzle',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'weather_mix'
        }
    },
    57: {
        day: {
            description: 'Freezing Drizzle',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'weather_mix'
        },
        night: {
            description: 'Freezing Drizzle',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'weather_mix'
        }
    },
    61: {
        day: {
            description: 'Light Rain',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Light Rain',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    63: {
        day: {
            description: 'Rain',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Rain',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    65: {
        day: {
            description: 'Heavy Rain',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Heavy Rain',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    66: {
        day: {
            description: 'Light Freezing Rain',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'weather_mix'
        },
        night: {
            description: 'Light Freezing Rain',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'weather_mix'
        }
    },
    67: {
        day: {
            description: 'Freezing Rain',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'weather_mix'
        },
        night: {
            description: 'Freezing Rain',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'weather_mix'
        }
    },
    71: {
        day: {
            description: 'Light Snow',
            image: 'https://images.pexels.com/photos/9215186/pexels-photo-9215186.jpeg',
            iconFont: 'cloudy_snowing'
        },
        night: {
            description: 'Light Snow',
            image: 'https://images.pexels.com/photos/8698973/pexels-photo-8698973.jpeg',
            iconFont: 'cloudy_snowing'
        }
    },
    73: {
        day: {
            description: 'Snow',
            image: 'https://images.pexels.com/photos/9215186/pexels-photo-9215186.jpeg',
            iconFont: 'cloudy_snowing'
        },
        night: {
            description: 'Snow',
            image: 'https://images.pexels.com/photos/8698973/pexels-photo-8698973.jpeg',
            iconFont: 'cloudy_snowing'
        }
    },
    75: {
        day: {
            description: 'Heavy Snow',
            image: 'https://images.pexels.com/photos/9215186/pexels-photo-9215186.jpeg',
            iconFont: 'cloudy_snowing'
        },
        night: {
            description: 'Heavy Snow',
            image: 'https://images.pexels.com/photos/8698973/pexels-photo-8698973.jpeg',
            iconFont: 'cloudy_snowing'
        }
    },
    77: {
        day: {
            description: 'Snow Grains',
            image: 'https://images.pexels.com/photos/9215186/pexels-photo-9215186.jpeg',
            iconFont: 'cloudy_snowing'
        },
        night: {
            description: 'Snow Grains',
            image: 'https://images.pexels.com/photos/8698973/pexels-photo-8698973.jpeg',
            iconFont: 'cloudy_snowing'
        }
    },
    80: {
        day: {
            description: 'Light Showers',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Light Showers',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    81: {
        day: {
            description: 'Showers',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Showers',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    82: {
        day: {
            description: 'Heavy Showers',
            image: 'https://images.pexels.com/photos/3178798/pexels-photo-3178798.jpeg',
            iconFont: 'rainy'
        },
        night: {
            description: 'Heavy Showers',
            image: 'https://images.pexels.com/photos/1824270/pexels-photo-1824270.jpeg',
            iconFont: 'rainy'
        }
    },
    85: {
        day: {
            description: 'Light Snow Showers',
            image: 'https://images.pexels.com/photos/9215186/pexels-photo-9215186.jpeg',
            iconFont: 'cloudy_snowing'
        },
        night: {
            description: 'Light Snow Showers',
            image: 'https://images.pexels.com/photos/8698973/pexels-photo-8698973.jpeg',
            iconFont: 'cloudy_snowing'
        }
    },
    86: {
        day: {
            description: 'Snow Showers',
            image: 'https://images.pexels.com/photos/9215186/pexels-photo-9215186.jpeg',
            iconFont: 'cloudy_snowing'
        },
        night: {
            description: 'Snow Showers',
            image: 'https://images.pexels.com/photos/8698973/pexels-photo-8698973.jpeg',
            iconFont: 'cloudy_snowing'
        }
    },
    95: {
        day: {
            description: 'Thunderstorm',
            image: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
            iconFont: 'thunderstorm'
        },
        night: {
            description: 'Thunderstorm',
            image: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
            iconFont: 'thunderstorm'
        }
    },
    96: {
        day: {
            description: 'Thunderstorm With Hail',
            image: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
            iconFont: 'weather_hail'
        },
        night: {
            description: 'Thunderstorm With Hail',
            image: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
            iconFont: 'weather_hail'
        }
    },
    99: {
        day: {
            description: 'Thunderstorm With Hail',
            image: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
            iconFont: 'weather_hail'
        },
        night: {
            description: 'Thunderstorm With Hail',
            image: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg',
            iconFont: 'weather_hail'
        }
    }
}