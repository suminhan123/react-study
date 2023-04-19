// our-getDomainLocale.com/news

import Link from "next/link";
import { Fragment } from "react";

function NewsPage() {
  return (
    <Fragment>
      <h1>the news page</h1>;
      <ul>
        <Link href="/news/article1">
          <li>article1</li>
        </Link>
        <li>article2</li>
      </ul>
    </Fragment>
  );
}
export default NewsPage;
