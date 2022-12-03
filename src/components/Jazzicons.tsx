import { Skeleton } from "antd";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

/**
 * Shows a Jazzicon for the provided wallet address
 * @param {*} props
 * @returns <Jazzicons /> JSX Elemenet
 */

const Jazzicons = ({ seed, size }: { seed: string; size?: number }) => {
  if (!seed) return <Skeleton.Avatar active size={40} />;

  if (size) return <Jazzicon seed={jsNumberForAddress(seed)} diameter={size} />;

  return <Jazzicon seed={jsNumberForAddress(seed)} />;
};

export default Jazzicons;
