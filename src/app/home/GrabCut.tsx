import React, {ChangeEvent, useEffect} from "react";
import ImageUploadApi from "../../api/imageUpload.api";
import {Button} from "@material-ui/core";

type GrabCutProp = {
    imgCroppedURL: string,
    step: number,
    activeStep: number,
    croppedImgFile: File | null
}

export default function GrabCut(props: GrabCutProp) {
    const {imgCroppedURL, activeStep, step, croppedImgFile} = props;
    const imgRef = React.useRef<HTMLImageElement>(null);
    const [imgResult, setImgResult] = React.useState("");
    const [canvasWidth, setCanvasWidth] = React.useState(0);
    const [canvasHeight, setCanvasHeight] = React.useState(0);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);
    const [color, setColor] = React.useState("white");

    let coord = {x: 0, y: 0};
    let paint = false;

    useEffect(() => {
        window.addEventListener('resize', onImgSizeChange)
    }, [])

    useEffect(() => {
        if (activeStep !== step) return;
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
        }

    }, [activeStep])

    useEffect(() => {
        setImgResult("");
    }, [imgCroppedURL])

    const onImgSizeChange = () => {
        if (imgRef.current != null) {
            let imgWidth = imgRef.current.width;
            let imgHeight = imgRef.current.height;
            setCanvasWidth(imgWidth);
            setCanvasHeight(imgHeight);
        }
    }

    const getPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (canvasRef.current) {
            let bounding = canvasRef.current.getBoundingClientRect()
            coord.x = e.clientX - bounding.x;
            coord.y = e.clientY - bounding.y;
        }
    }

    const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!paint || ctx == null) return;
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.moveTo(coord.x, coord.y);
        getPosition(e);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }

    const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        paint = true;
        getPosition(e);
    }

    const onMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        paint = false;
    }

    const toggleDrawColor = (c: string) => {
        setColor(c)
    }

    const restoreCanvas = () => {
        if (ctx && canvasRef.current) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }

    const submitGrabCut = () => {
        if (imgRef.current == null) return;

        let imgWidth = imgRef.current.width;
        let naturalWidth = imgRef.current.naturalWidth;
        let natualHeight = imgRef.current.naturalHeight;
        // clone canvas to scale the mask layer with the same resolution of original image
        let cloneCanvas = document.createElement('canvas');
        let cloneCtx = cloneCanvas.getContext('2d');
        cloneCanvas.width = naturalWidth;
        cloneCanvas.height = natualHeight;
        // @ts-ignore
        cloneCtx.drawImage(canvasRef.current, 0, 0, canvasWidth, canvasHeight, 0, 0, naturalWidth, natualHeight);
        let maskImg = cloneCanvas.toDataURL('image/png').replace('data:image/png;base64', '');
        setImgResult(cloneCanvas.toDataURL('image/png'))
        cloneCanvas.remove()
        // @ts-ignore
        ImageUploadApi.uploadImage(croppedImgFile, maskImg)
            .then(res => {
                // // @ts-ignore
                let imgsrc = "data:image/jpg;base64," + res;
                setImgResult(imgsrc)
            });
    }

    return (
        <div>
            {activeStep === step ?
                <div>
                    <div style={{position: "relative"}}>
                        <input checked={color == "black"} type="radio"
                               onChange={() => toggleDrawColor("black")}/> Background
                        <input checked={color == "white"} type="radio"
                               onChange={() => toggleDrawColor("white")}/> Object
                    </div>
                    <img ref={imgRef} onLoad={onImgSizeChange} id={"imgId"} style={{maxWidth: "100%", left: 0}}
                         src={imgCroppedURL}/>
                    <canvas onMouseMove={(e) => onMouseMove(e)}
                            onMouseDown={(e) => onMouseDown(e)}
                            onMouseUp={(e) => onMouseUp(e)}
                            ref={canvasRef} width={canvasWidth} height={canvasHeight}
                            style={{position: "absolute", left: 0, zIndex: 10}}>
                    </canvas>
                    <img style={{maxWidth: "100%"}} src={imgResult}/>
                    <div style={{display: 'block'}}>
                        <Button variant={"outlined"} color={"primary"} onClick={restoreCanvas}>Restore</Button>
                        <Button variant={"outlined"} color={"secondary"} onClick={submitGrabCut}>Grab cut</Button>
                    </div>
                </div>
                : null}
        </div>
    )
}
