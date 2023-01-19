import Link from 'next/link';
import React from 'react';

export default function DropdownLink(props) {
  let { link, children, ...rest } = props;
  return (
    <Link href={link} legacyBehavior>
      <a {...rest}>{children}</a>
    </Link>
  );
}
