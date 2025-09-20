import * as React from "react";
export function Button({children,type='button',variant='default',...props}:{children:React.ReactNode,type?:'button'|'submit'|'reset',variant?:'default'|'outline'} & React.ButtonHTMLAttributes<HTMLButtonElement>){
  const cls = variant==='outline' ? 'btn-outline' : 'btn';
  return <button type={type} className={cls} {...props}>{children}</button>
}
