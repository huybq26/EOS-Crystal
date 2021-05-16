import React, {useEffect} from "react";
import {Button} from "@material-ui/core";

type CropImageProp = {
    imgLocalObj: string,
    step: number,
    activeStep: number,
    handleCroppedImg: (u: string, croppedFile: Blob) => any
}

export default function CropImage(props: CropImageProp) {
    const {imgLocalObj, activeStep, step, handleCroppedImg} = props;
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);
    const [canvasWidth, setCanvasWidth] = React.useState(0);
    const [canvasHeight, setCanvasHeight] = React.useState(0);
    const [croppedImg, setCroppedImg] = React.useState("");
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let widthCrop = 0;
    let heightCrop = 0;

    useEffect(() => {
        window.addEventListener('resize', onImgSizeChange)
    }, [])

    useEffect(() => {
        setCroppedImg("");
    }, [imgLocalObj]);

    useEffect(() => {
        if (activeStep !== step) return;
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
        }

    }, [activeStep]);

    const onImgSizeChange = () => {
        if (imgRef.current != null) {
            let imgWidth = imgRef.current.width;
            let imgHeight = imgRef.current.height;
            setCanvasWidth(imgWidth);
            setCanvasHeight(imgHeight);
        }
    }

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // save the starting x/y of the rectangle
        // @ts-ignore
        let bounding = canvasRef.current.getBoundingClientRect();
        startX = e.clientX - bounding.x;
        startY = e.clientY - bounding.y;

        // set a flag indicating the drag has begun
        isDown = true;
    }

    const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // the drag is over, clear the dragging flag
        isDown = false;
    }

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // if we're not dragging, just return
        if (!isDown || !ctx) {
            return;
        }
        // get the current mouse position
        // @ts-ignore
        let bounding = canvasRef.current.getBoundingClientRect();
        let mouseX = e.clientX - bounding.x;
        let mouseY = e.clientY - bounding.y;

        // clear the canvas
        // @ts-ignore
        ctx.lineWidth = 2;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // calculate the rectangle width/height based
        // on starting vs current mouse position
        widthCrop = mouseX - startX;
        heightCrop = mouseY - startY;

        // draw a new rect from the start position
        // to the current mouse position
        ctx.strokeRect(startX, startY, widthCrop, heightCrop);
    }

    const cropImage = () => {
        if (widthCrop === 0) {
            alert("No crop region detected!");
            return;
        }

        if (imgRef.current == null) return;

        let naturalWidth = imgRef.current.naturalWidth;
        // clone canvas to scale the mask layer with the same resolution of original image
        let cloneCanvas = document.createElement('canvas');
        let cloneCtx = cloneCanvas.getContext('2d');
        let scale = naturalWidth / canvasWidth;

        let widthCropped = widthCrop * scale;
        let heightCropped = heightCrop * scale;
        cloneCanvas.width = widthCropped;
        cloneCanvas.height = heightCropped;
        // @ts-ignore
        cloneCtx.drawImage(imgRef.current, startX * scale, startY * scale, widthCropped, heightCropped, 0, 0, widthCropped, heightCropped);
        cloneCanvas.toBlob((blob) => {
            let croppedURL = URL.createObjectURL(blob);
            setCroppedImg(croppedURL);
            if (blob){
                handleCroppedImg(croppedURL, blob);
            }

            cloneCanvas.remove();
        }, 'image/png')
    }

    return (
        <div>
            {activeStep === step ?
                <div>
                    <img ref={imgRef} onLoad={onImgSizeChange} id={"imgId"} style={{maxWidth: "100%", left: 0}}
                         src={imgLocalObj}/>
                    <canvas onMouseMove={(e) => onMouseMove(e)}
                            onMouseDown={(e) => onMouseDown(e)}
                            onMouseUp={(e) => onMouseUp(e)}
                            ref={canvasRef} width={canvasWidth} height={canvasHeight}
                            style={{position: "absolute", left: 0, zIndex: 10}}>
                    </canvas>

                    <Button style={{display: "block"}} variant={"outlined"} color={"secondary"}
                            onClick={cropImage}>Crop</Button>
                    <img style={{maxWidth: "100%"}} src={croppedImg}/>
                </div>
                : null}
        </div>
    )
}
