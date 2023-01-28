import Lottie from 'lottie-react';
import loadingAnimationData from '../lotties/loading-animation-data.json';
import loadingAnimationGif from '../lotties/loading-animation.gif';

export default function LoadingAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      {/* <Lottie options={defaultOptions} height={80} width={80} /> */}
      {/* There is a problem with this lottie animation. As a quick-fix, heres a gif instead */}
      <img
        src={loadingAnimationGif}
        alt=""
        style={{ height: '80px', width: '80px' }}
      />
    </div>
  );
}
