// import { BigNumber } from "ethers"

export async  function preparePostData(post, provider, timestamp, relativeTimeCallback) {
    let authorAddress = post.owner
    let authorEnsName = await provider.lookupAddress(authorAddress)
    let authorAvatarUrl = null
    if (authorEnsName) authorAvatarUrl = await provider.getAvatar(authorEnsName) 
    let isSponsored = false
    let postRelativeTime = relativeTimeCallback(timestamp)
    let content = post.text
    
    return { authorAddress, authorEnsName, authorAvatarUrl, isSponsored, postRelativeTime, content }
}

export function getTimeSince(timestamp) {
    let seconds = Date.now() / 1000 - timestamp
    let realativeTimeStr
        if (seconds === 0) {
            realativeTimeStr = 'now'
        } else if (seconds < 60) {
            realativeTimeStr = seconds + 's'
        } else if (seconds >= 60 && seconds < 3600) {
            realativeTimeStr = Math.floor(seconds) + 'min'
        } else if (seconds >= 3600 && seconds < 3600 * 24) {
            realativeTimeStr = Math.floor(seconds / 3600) + 'h'
        } else if (seconds >= (3600 * 24) && seconds < (3600 * 48)) {
            realativeTimeStr = 'Yesterday'
        } else if (seconds >= (3600 * 48)) {
            let date = new Date(timestamp * 1000)
            let year = date.getFullYear()
            let month = convertNumToShortMonth(date.getMonth())
            let day = date.getDate()
            realativeTimeStr = `${month} ${day}, ${year}`
        } else {
            realativeTimeStr = ''
    }

    return realativeTimeStr
}

export function convertNumToShortMonth(num) {
    switch(num) {
        case 0:
            return 'Jan'
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Apr'
        case 4:
            return 'May'
        case 5:
            return 'Jun'
        case 6:
            return 'Jul'
        case 7:
            return 'Aug'
        case 8:
            return 'Sep'
        case 9:
            return 'Oct'
        case 10:
            return 'Nov'
        case 11:
            return 'Dec'
        default:
            return 'month'
    }
}