import { StorageKey } from '../../constants'
import { getStorage } from '../../utils'
import { $commentTableRows, $infoCard, $replyBox, $topicHeader } from '../globals'
import { loadIcons } from '../helpers'
import { handlingComments } from './comment'
import { handlingContent } from './content'
import { handlingLayout } from './layout'
import { handlingPaging } from './paging'
import { handleReply } from './reply'
import { handlingTools } from './tool'

void (async () => {
  const storage = await getStorage()
  const options = storage[StorageKey.Options]

  // handlingLayout()


  // handlingTools()

  // 按 Esc 隐藏回复框。
  {
    $(document).on('keydown', (ev) => {
      if (!ev.isDefaultPrevented()) {
        if (ev.key === 'Escape') {
          const $replyContent = $('#reply_content')

          if ($replyBox.hasClass('reply-box-sticky')) {
            $replyBox.removeClass('reply-box-sticky')
            $('#undock-button').css('display', 'none')
          }

          $replyContent.trigger('blur')
        }
      }
    })
  }

  // handlingContent()


  await handlingComments()

})()
