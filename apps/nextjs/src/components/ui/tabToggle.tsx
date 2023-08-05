interface Props {
  options: string[]
  activeOption: string
  onToggleChange: (option: string) => void
}

const TabToggle = ({ options, onToggleChange, activeOption }: Props) => {
  return (
    <div className="flex items-baseline justify-evenly">
      {options.map((option, index) => (
        <button
          key={`${option}_${index}`}
          onClick={() => onToggleChange(option)}
          className={`${
            activeOption === option
              ? "text-lg"
              : "text-muted-foreground/30 text-md"
          }`}
        >
          <span>{option}</span>
        </button>
      ))}
    </div>
  )
}

export default TabToggle
