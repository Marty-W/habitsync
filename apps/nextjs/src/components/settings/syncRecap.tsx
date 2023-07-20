interface Props {
  icon: React.ReactNode
  text: string
  children: React.ReactNode
}

const SyncRecap = ({ icon, children, text }: Props) => {
  return (
    <div>
      <div className="my-5 flex w-full flex-col items-center">
        <div className="mb-3">{icon}</div>
        <p className="text-xl">{text}</p>
      </div>
      <div className="mx-auto flex w-1/3 flex-col gap-3">{children}</div>
    </div>
  )
}

export default SyncRecap
