import { Remark, useRemarkSync } from 'react-remark'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

type RequirementTextProps = {
  content: string
}

const RequirementText = ({ content }: RequirementTextProps) =>
  useRemarkSync(content, {
    remarkToRehypeOptions: { allowDangerousHtml: true },
    //@ts-ignore
    rehypePlugins: [rehypeRaw, rehypeSanitize],
  })

export default RequirementText
