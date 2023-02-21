import {ComponentType, useState} from 'react';

type THOCProps = {
  isActive: boolean;
  onActiveChange: () => void;
};

function withActiveFlag<T>(Component: ComponentType<T>, curFlag = false): ComponentType<Omit<T, keyof THOCProps>> {
  type TComponentProps = Omit<T, keyof THOCProps>;

  function WithActiveFlag(props: TComponentProps): JSX.Element {
    const [isActive, setIsActive] = useState(curFlag);

    const activeChangeHandler = () => setIsActive(!isActive);

    return (
      <Component
        {...props as T}
        isActive={isActive}
        onActiveChange={activeChangeHandler}
      />
    );
  }

  return WithActiveFlag;
}

export default withActiveFlag;
