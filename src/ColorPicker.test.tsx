import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ColorPicker } from "./ColorPicker";

const colorPalette = ["#010221", "#0A7373", "#B7BF99", "#EDAA25", "#C43302"];

const hexToRGB = (hex: string) => {
    const m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return `rgb(${parseInt(m![1], 16)}, ${parseInt(m![2], 16)}, ${parseInt(m![3], 16)})`
}

const generateRandomColorPalette = () => {
    return Array(6).fill("").map(() => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
}


test("check for all elements to be in document", () => {
    render(<ColorPicker colorPalette={colorPalette}/>);

    const currentColorElement = screen.getByTestId("colorpicker-currentColor")
    const allColors = screen.getAllByTestId("colorpicker-colorSelector")

    expect(currentColorElement).toBeInTheDocument()
    expect(allColors.length).toEqual(colorPalette.length)
})


test("check initial color", () => {
  render(<ColorPicker colorPalette={colorPalette}/>);

  const currentColorElement = screen.getByTestId("colorpicker-currentColor")
  expect(currentColorElement).toHaveStyle({"background": hexToRGB("#000000")})
});

test("check color available for picking", () => {
    const randomColorPalette = generateRandomColorPalette()
    render(<ColorPicker colorPalette={randomColorPalette}/>)

    const allColors = screen.getAllByTestId("colorpicker-colorSelector")
    allColors.forEach((color,index) => {
        expect(color.style.background).toEqual(hexToRGB(randomColorPalette[index]))
    })
})

test("check if currentColor changes when color is selected", () => {
    const randomColorPalette = generateRandomColorPalette()
    render(<ColorPicker colorPalette={randomColorPalette}/>)

    const allColors = screen.getAllByTestId("colorpicker-colorSelector")
    allColors.forEach((color,index) => {
        fireEvent.click(color)
        const currentColorElement = screen.getByTestId("colorpicker-currentColor")
        expect(currentColorElement).toHaveStyle({"background": hexToRGB(randomColorPalette[index])})
    })
})