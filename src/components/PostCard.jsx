import avatar from '../assets/images/avatar.svg'
import more from '../assets/images/3-dots.svg'
import coins from '../assets/images/coins.svg'
import coinsRed from '../assets/images/coins-red.svg'
import insert from '../assets/images/insert.svg'

function PostCard({ post }) {
    return(
        <div className="card">
            <div className="card-top">
                <div className="avatar-wrapper">
                    <img src={avatar} alt="author-avatar" className="avatar" />
                </div>
                <div className="card-center">
                    <div className="card-top-center">
                        <span className="card-owner">{post.authorEnsName || post.authorAddress}</span>
                        <span className="interpunct">⋅</span>
                        <span className="card-relative-time">{post.postRelativeTime}</span>
                    </div>
                    <p className="card-content">{post.content}</p>
                </div>
                <div className="more-wrapper">
                    <img src={more} alt="more-options-icon" className="more" />
                </div>
            </div>
            <div className="card-bottom">
                <div className="eth">
                    <img src={post.isSponsored ? coinsRed : coins} alt="ethers-icon" className="card-bottom-icon" />
                    <span className={post.isSponsored ? 'amount-red' : 'amount'}>6.2K</span>
                </div>
                <div className="second">
                    <img src={insert} alt="insert-icon" className="card-bottom-icon" />
                    <span className="amount">61</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard