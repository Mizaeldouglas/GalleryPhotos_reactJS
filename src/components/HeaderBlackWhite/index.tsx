import * as C from './style'
import React, { useContext }  from 'react'
import Switch from 'react-switch'
import { ThemeContext } from "styled-components";
import { shade } from 'polished'

interface Props {
    toggleTheme(): void;
}

export const HeaderBlackWhite: React.FC<Props> =({toggleTheme})=>{
    function refreshPage(){ 
        window.location.reload(); 
    }


    const { colors, title } = useContext(ThemeContext)
    return(
        <C.ConatinerBlackWhite>
            <span>Light</span>
            <Switch 
                onChange={toggleTheme}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                onHandleColor={colors.secundary}
                offHandleColor={shade(0.15,colors.primary)}
                offColor={shade(0.15,colors.primary)}
                onColor={colors.secundary}
            />
            <span>Dark</span>
        </C.ConatinerBlackWhite>
    )
}