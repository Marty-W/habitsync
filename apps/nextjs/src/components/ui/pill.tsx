interface Props {
  variant: "success" | "void" | "failure" | "blank"
}

const Pill = ({ variant }: Props) => {
  let color

  switch (variant) {
    case "success":
      color = "bg-green-500"
      break
    case "void":
      color = "bg-yellow-500"
      break
    case "failure":
      color = "bg-red-500"
      break
    case "blank":
      color = "bg-white"
      break
  }

  return (
    <div
      className={`mx-1 h-full w-[0.6rem] rounded-lg ${color} ${
        variant === "blank" && "border"
      }`}
    />
  )
}

export default Pill
