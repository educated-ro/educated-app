import Link from 'next/link'
import { SidebarLink } from '@/components/Layout/types'

type SidebarLinkProps = SidebarLink & {
  active: boolean
}

export default function SidebarLinkComponent({ text, href, icon, active }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div className={`flex text-white text-lg gap-6 p-4 items-center hover:bg-[#0EBEE5] rounded-md uppercase transition-all ${active ? 'bg-[#0EBEE5] font-bold' : 'bg-transparent'}`}>
        {icon}
        <p className='text-sm'>{text}</p>
      </div>
    </Link>
  )
}
