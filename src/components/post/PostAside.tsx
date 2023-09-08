'use client'

import React, { DependencyList, useEffect, useState } from 'react'
import TableOfContents, { TableOfContentsProps } from '@/components/TableOfContents'
import Like from '@/components/Like'

function useHeadings(deps: DependencyList = []) {
  const [headings, setHeadings] = useState<TableOfContentsProps['headings']>([])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll(
        '.markdown-body > h2, .markdown-body > h3, .markdown-body > h4, .markdown-body > h5, .markdown-body > h6',
      ),
    )
      .filter(element => element.id)
      .map(element => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName.substring(1)),
      }))
    setHeadings(elements)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return headings
}

export interface PostAsideProps {
  slug: string
  toc?: boolean
}

const PostAside: React.FC<PostAsideProps> = props => {
  const { slug, toc = true } = props
  const headings = useHeadings()

  return (
    <aside className="absolute left-full h-full pt-16 ml-16">
      <div className="sticky top-[10vh] max-w-[250px] mr-4">
        {/* 侧边目录导航 */}
        {toc && headings.length > 0 && <TableOfContents headings={headings} />}
        {/* 点赞 */}
        <Like slug={slug} />
      </div>
    </aside>
  )
}

export default PostAside
