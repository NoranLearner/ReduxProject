import { deepPurple, cyan } from '@mui/material/colors';

const getDesignTokens = (myMode) => ({

    palette: {
            // @ts-ignore
            mode: myMode,

            ...(myMode === 'light' ? {
                // palette values for light mode
                // @ts-ignore
                favColor: {
                    main: deepPurple[700]
                }
            } : {
                // palette values for dark mode
                // @ts-ignore
                favColor: {
                    main: cyan[900]
                }
            })
        },
});

export default getDesignTokens;