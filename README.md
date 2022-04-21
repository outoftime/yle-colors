# Your Local COVID Precautions

This is a tool to help you evaluate the current COVID risk in your locality and take precautions appropriate to the case rate. It’s based on the [Riding the Waves](https://yourlocalepidemiologist.substack.com/p/riding-the-waves-a-framework-for?s=r") post on the [Your Local Epidemiologist](https://yourlocalepidemiologist.substack.com") newsletter. This project isn’t affiliated with Your Local Epidemiologist, but YLE’s work is used with permission.

## Data

The data comes from the [COVID Act Now API](https://apidocs.covidactnow.org). It’s periodically downloaded to a Postgres database and served by a Ruby microservice; [the source code is available here](https://github.com/outoftime/yle-colors-data).

## Stack

This repo is a pretty standard Next app, using the following frameworks and libraries:

* [Next.js](https://nextjs.org)
* [React](https://reactjs.org)
* [Chakra UI](https://chakra-ui.com)
* [React Query](https://react-query.tanstack.com)
* [TypeScript](https://www.typescriptlang.org)

## Contributing

This is an open-source project, and contributions are welcome.

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You’ll find the page components in `src/pages`.

## License

Your Local Covid Precautions is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
See the `LICENSE` file in this repository for the full text of the license. If this is unreachable, see <https://www.gnu.org/licenses/>
