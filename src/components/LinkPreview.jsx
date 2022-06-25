function LinkPreview({link, img, host, desc}) {
    return (
        <div className="link-preview">
            <a href={link} target="_blank" rel="noreferrer" className="link-preview-anchor">
                <img src={img} alt="link-thumbnail" className="link-preview-img" />
                <p className="link-preview-host">{host}</p>
                <h1 className="link-preview-desc">{desc}</h1>
            </a>
        </div>
    )
}

export default LinkPreview