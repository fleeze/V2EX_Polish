/** 登录人的昵称 */
export const loginName = $('#Top .tools > a[href^="/member"]').text()

/** 发帖人的昵称 */
export const topicOwnerName = $('#Main > .box:nth-child(1) > .header > small > a').text()

/** 主题内容区 */
export const $topicContentBox = $('#Main .box:has(.topic_content)')

/** 主题下的评论区 */
export const $commentBox = $('#Main .box:has(.cell[id^="r_"])')

/** 评论区的回复 */
export const $commentCells = $commentBox.find('.cell[id^="r_"]')

export const $commentTableRows = $commentCells.find('> table > tbody > tr')

/** 每一页的回复列表数据 */
export const commentDataList = $commentTableRows
  .map((idx, tr) => {
    const id = $commentCells[idx].id
    const td = $(tr).find('> td:nth-child(3)')
    const member = td.find('> strong > a')
    const memberName = member.text()
    const memberLink = member.prop('href')
    const content = td.find('> .reply_content').text()
    const likes = Number(td.find('span.small').text())
    const floor = td.find('span.no').text()

    const memberNameMatches = Array.from(content.matchAll(/@(\S+)\s/g))
    const refMemberNames =
      memberNameMatches.length > 0
        ? memberNameMatches.map(([, name]) => {
            return name
          })
        : undefined

    const floorNumberMatches = Array.from(content.matchAll(/#(\d+)/g))
    const refFloors =
      floorNumberMatches.length > 0
        ? floorNumberMatches.map(([, floor]) => {
            return floor
          })
        : undefined

    return {
      /** HTML 元素上的 id */
      id,
      /** 回复者昵称 */
      memberName,
      /** 回复者主页链接 */
      memberLink,
      /** 回复内容 */
      content,
      /** 该回复被感谢的次数 */
      likes,
      /** 楼层数 */
      floor,
      /** 遍历索引值 */
      index: idx,
      /** 回复中 @ 别人 */
      refMemberNames,
      /** 回复中 # 楼层 */
      refFloors,
    }
  })
  .get()

export function getOS() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i
  const windowsPlatforms = /(win32|win64|windows|wince)/i
  const iosPlatforms = /(iphone|ipad|ipod)/i

  let os: 'macos' | 'ios' | 'windows' | 'android' | 'linux' | null = null

  if (macosPlatforms.test(userAgent)) {
    os = 'macos'
  } else if (iosPlatforms.test(userAgent)) {
    os = 'ios'
  } else if (windowsPlatforms.test(userAgent)) {
    os = 'windows'
  } else if (userAgent.includes('android')) {
    os = 'android'
  } else if (userAgent.includes('linux')) {
    os = 'linux'
  }

  return os
}
