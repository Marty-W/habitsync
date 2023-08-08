import Counter from "~/components/ui/animatedCounter";

interface Props {
  rate: string;
}

const SuccessRate = ({ rate }: Props) => {
  return (
    <div className="text-center">
      <div className="text-md text-muted-foreground mb-3">
        <span>Success Rate</span>
      </div>
      <div className="relative">
        <Counter
          from={0}
          to={Number(rate)}
          className="text-3xl"
          animationDuration={2}
          postValue=" %"
        />
      </div>
    </div>
  );
};

export default SuccessRate;
