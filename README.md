# magvar
Calculates Magnetic Variation at a given position using the World Magnetic model 2015-2020.

## Getting started

`$ npm install magvar --save`

## Usage

Latitudes and longitudes should be specified in degrees 
N and E are positive, S and W negative.
Height should be specified in degrees.

Option 1:
The simplist way to use is to use statically.
```javascript
import Magvar from 'magvar';

const variation = Magvar.Get([latitude], [longitude]);

```

Option 2:
If you are going to be doing many calculations, it is better to create an instance and reuse.
```javascript
import magvar from 'magvar';

const mv = new Magvar();

const variation = mv.GetMagVar([latitude in degrees], [longitude in degrees], [height in metres])
```

Take a look at the test file for some examples.
  
## Test
After installing:
```javascript
npm run test
```