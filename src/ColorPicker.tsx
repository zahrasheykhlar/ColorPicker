import { useState } from "react"
import "./ColorPicker.css"

type ColorPickerProps = {
    colorPalette: string[]
    // Type Definition for the Component props
    // Look inside the tests or the app.tsx to see what props are needed
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const { colorPalette } = props
    const [hex, setHex] = useState("#000000")
    const handleClick = (color: string) => {
        setHex(color);
    };
    return (<div className="card">
        <div data-testid="colorpicker-currentColor" className="big-square" style={{ backgroundColor: hex }}> </div>
        <div className="grid-container">
            {colorPalette.map((color, index) => (
                <div data-testid="colorpicker-colorSelector" key={index} className="square" style={{ backgroundColor: color }} onClick={() => handleClick(color)}>

                </div>
            ))}
        </div>
    </div>)
}

export { ColorPicker }