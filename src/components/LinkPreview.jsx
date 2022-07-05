function LinkPreview({link, img, video, host, desc}) {
    return (
        <div className="link-preview">
            <a href={link} target="_blank" rel="noreferrer" className="link-preview-anchor">
                { !img && !host && !desc ? <p className="link-preview-host">{link}</p> : null}
                { img ? <img src={img} alt="link-thumbnail" className="link-preview-img" /> : null }
                { !img && video ? <img src={video} alt="link-thumbnail" className="link-preview-img" /> : null }
                { host ? <p className="link-preview-host">{host}</p> : null }
                { desc ? <h1 className="link-preview-desc">{desc}</h1> : null }
            </a>
        </div>
    )
}

export default LinkPreview