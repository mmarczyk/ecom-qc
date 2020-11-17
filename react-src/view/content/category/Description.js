const Description = ({full}) => {
    return (
        <div className="Description">
            <h1>{oPageData.sName}</h1>
            <div
                dangerouslySetInnerHTML={{
                    __html: full ?
                        oPageData.sDescriptionFull :
                        oPageData.sDescriptionShort
                }}
            />
        </div>
    );
};