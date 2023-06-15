import React from 'react';
import { BounceLoader, BeatLoader } from 'react-spinners';

export default function Spinner() {
  return <BeatLoader color={'#1E3A8A'} speedMultiplier={2} />;
}
