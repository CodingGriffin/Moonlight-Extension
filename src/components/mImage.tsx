interface imgSrcType {
    imgSrc:string;
    width:string;
}

const MImage = ({imgSrc, width}:imgSrcType) => {
    return (
        <div className="flex justify-center">
            <img src={imgSrc} width={width} className="" />
        </div>
    )
}

export default MImage;