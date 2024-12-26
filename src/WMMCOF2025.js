// WMM _2025 coefficients
const gnmWmm = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-29351.8, -1410.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-2556.6, 2951.1, 1649.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1361.0, -2404.1, 1243.8, 453.6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [895.0, 799.5, 55.7, -281.1, 12.1, 0, 0, 0, 0, 0, 0, 0, 0],
  [-233.2, 368.9, 187.2, -138.7, -142.0, 20.9, 0, 0, 0, 0, 0, 0, 0],
  [64.4, 63.8, 76.9, -115.7, -40.9, 14.9, -60.7, 0, 0, 0, 0, 0, 0],
  [79.5, -77.0, -8.8, 59.3, 15.8, 2.5, -11.1, 14.2, 0, 0, 0, 0, 0],
  [23.2, 10.8, -17.5, 2.0, -21.7, 16.9, 15.0, -16.8, 0.9, 0, 0, 0, 0],
  [4.6, 7.8, 3.0, -0.2, -2.5, -13.1, 2.4, 8.6, -8.7, -12.9, 0, 0, 0],
  [-1.3, -6.4, 0.2, 2.0, -1.0, -0.6, -0.9, 1.5, 0.9, -2.7, -3.9, 0, 0],
  [2.9, -1.5, -2.5, 2.4, -0.6, -0.1, -0.6, -0.1, 1.1, -1.0, -0.2, 2.6, 0],
  [-2.0, -0.2, 0.3, 1.2, -1.3, 0.6, 0.6, 0.5, -0.1, -0.4, -0.2, -1.3, -0.7]
];

const hnmWmm = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4545.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -3133.6, -815.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -56.6, 237.5, -549.5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 278.6, -133.9, 212.0, -375.6, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 45.4, 220.2, -122.9, 43.0, 106.1, 0, 0, 0, 0, 0, 0, 0],
  [0, -18.4, 16.8, 48.8, -59.8, 10.9, 72.7, 0, 0, 0, 0, 0, 0],
  [0, -48.9, -14.4, -1.0, 23.4, -7.4, -25.1, -2.3, 0, 0, 0, 0, 0],
  [0, 7.1, -12.6, 11.4, -9.7, 12.7, 0.7, -5.2, 3.9, 0, 0, 0, 0],
  [0, -24.8, 12.2, 8.3, -3.3, -5.2, 7.2, -0.6, 0.8, 10.0, 0, 0, 0],
  [0, 3.3, 0.0, 2.4, 5.3, -9.1, 0.4, -4.2, -3.8, 0.9, -9.1, 0, 0],
  [0, 0, 2.9, -0.6, 0.2, 0.5, -0.3, -1.2, -1.7, -2.9, -1.8, -2.3, 0],
  [0, -1.3, 0.7, 1.0, -1.4, 0.0, 0.6, -0.1, 0.8, 0.1, -1.0, 0.1, 0.2]
];

const gtnmWmm = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [12.0, 9.7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-11.6, -5.2, -8.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1.3, -4.2, 0.4, -15.6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-1.6, -2.4, -6.0, 5.6, -7.0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0.6, 1.4, 0.0, 0.6, 2.2, 0.9, 0, 0, 0, 0, 0, 0, 0],
  [-0.2, -0.4, 0.9, 1.2, -0.9, 0.3, 0.9, 0, 0, 0, 0, 0, 0],
  [-0, -0.1, -0.1, 0.5, -0.1, -0.8, -0.8, 0.8, 0, 0, 0, 0, 0],
  [-0.1, 0.2, 0.0, 0.5, -0.1, 0.3, 0.2, -0, 0.2, 0, 0, 0, 0],
  [-0, -0.1, 0.1, 0.3, -0.3, 0, 0.3, -0.1, 0.1, -0.1, 0, 0, 0],
  [0.1, 0.0, 0.1, 0.1, -0, -0.3, 0, -0.1, -0.1, -0, -0, 0, 0],
  [0, -0, 0, 0, 0, -0.1, 0, -0, -0.1, -0.1, -0.1, -0.1, 0],
  [0, 0, -0, -0, -0, -0, 0.1, -0, 0, 0, -0.1, -0, -0.1]
];

const htnmWmm = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -21.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -27.7, -12.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4.0, -0.3, -4.1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1.1, 4.1, 1.6, -4.4, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, -0.5, 2.2, 0.4, 1.7, 1.9, 0, 0, 0, 0, 0, 0, 0],
  [0, 0.3, -1.6, -0.4, 0.9, 0.7, 0.9, 0, 0, 0, 0, 0, 0],
  [0, 0.6, 0.5, -0.8, 0.0, -1.0, 0.6, -0.2, 0, 0, 0, 0, 0],
  [0, -0.2, 0.5, -0.4, 0.4, -0.5, -0.6, 0.3, 0.2, 0, 0, 0, 0],
  [0, -0.3, 0.3, -0.3, 0.3, 0.2, -0.1, -0.2, 0.4, 0.1, 0, 0, 0],
  [0, 0, -0, -0.2, 0.1, -0.1, 0.1, 0.0, -0.1, 0.2, -0, 0, 0],
  [0, -0, 0.1, -0, 0.1, -0, -0, 0.1, -0, 0, 0, 0, 0],
  [0, -0, 0, -0.1, 0.1, -0, -0, -0, 0, -0, -0, 0, -0.1]
];

const julianDaysCOF = 2460677;

const testData = [
  /*
  # Field 1: Decimal year
  # Field 2: Altitude (km)
  # Field 3: geodetic latitude (deg)
  # Field 4: geodetic longitude (deg)
  # Field 5: declination (deg)
  # Field 6: inclination (deg)
  # Field 7: H (nT)
  # Field 8: X (nT)
  # Field 9: Y (nT)
  # Field 10: Z (nT)
  # Field 11: F (nT)
  # Field 12: dD/dt (deg/year)
  # Field 13: dI/dt (deg/year)
  # Field 14: dH/dt (nT/year)
  # Field 15: dX/dt (nT/year)
  # Field 16: dY/dt (nT/year)
  # Field 17: dZ/dt (nT/year)
  # Field 18: dF/dt (nT/year)
  */
  [2025.0, 28, 89, -121, -99.77, 88.47, 1504.298146, -255.388723, -1482.460628, 56194.288771, 56214.419888, 2.491706, -0.009987, 10.28564, 62.723738, -21.242793, 18.075146, 18.343917],
  [2025.0, 48, 80, -96, -29.91, 87.77, 2164.285547, 1875.98228, -1079.269389, 55623.044051, 55665.134163, 1.248417, -0.057537, 55.469239, 71.596398, 13.214774, -12.148507, -9.982652],
  [2025.0, 54, 82, 87, 54.89, 87.68, 2302.427342, 1324.336929, 1883.42862, 56740.772059, 56787.4668, 0.884574, 0.03613, -34.169939, -48.732002, -7.505574, 41.134755, 39.715524],
  [2025.0, 65, 43, 93, 0.5, 64.1, 24300.764692, 24299.852822, 210.517066, 50037.923998, 55626.621348, -0.019813, 0.030822, -3.938347, -3.865401, -8.437166, 60.388819, 52.601187],
  [2025.0, 51, -33, 109, -5.49, -67.5, 21838.046477, 21737.778822, -2090.274098, -52710.00392, 57054.752538, 0.069861, 0.026375, 29.809763, 32.221578, 23.651711, -3.33404, 14.490015],
  [2025.0, 39, -59, -8, -15.75, -58.55, 14918.115796, 14358.095523, -4049.10754, -24389.086374, 28589.818346, 0.010988, 0.055916, -0.905656, -0.095123, 2.999401, 54.951779, -47.350226],
  [2025.0, 3, -50, -103, 27.96, -54.89, 22106.041373, 19526.532799, 10362.99098, -31437.562789, 38431.724126, -0.032104, 0.024888, -42.140973, -31.417096, -30.696074, 88.952383, -97.003616],
  [2025.0, 94, -29, -110, 15.74, -38.25, 24181.990098, 23275.47108, 6559.046509, -19063.605287, 30792.688931, -0.011062, 0.027107, -42.453758, -39.595926, -16.008811, 52.018933, -65.544285],
  [2025.0, 66, 14, 143, -0.19, 12.82, 35003.635649, 35003.441364, -116.624818, 7966.315182, 35898.700342, -0.055086, -0.003859, 10.848172, 10.735986, -33.689325, -0.010939, 10.575266],
  [2025.0, 18, 0, 21, 1.29, -26.06, 29282.246275, 29274.811882, 659.800118, -14316.72254, 32594.761714, 0.030544, 0.079429, -8.761425, -9.110937, 15.408838, 54.58125, -31.844958],
  [2025.5, 6, -36, -137, 20.28, -52.11, 25353.230658, 23781.930678, 8786.698927, -32577.518648, 41280.516301, 0.025348, 0.014224, -34.463126, -36.214518, -1.422651, 60.968936, -69.281309],
  [2025.5, 63, 26, 81, 0.51, 41.07, 34803.980117, 34802.613433, 308.431881, 30332.056989, 46166.554053, 0.018525, 0.021888, 20.342054, 20.241534, 11.432574, 41.122831, 42.353703],
  [2025.5, 69, 38, -144, 12.93, 56.97, 23096.337032, 22510.804524, 5167.636206, 35525.990264, 42373.774537, -0.1053, -0.007297, -33.951051, -23.593092, -48.967345, -62.123761, -70.589724],
  [2025.5, 50, -70, -133, 57.21, -71.94, 16656.709403, 9021.847823, 14001.865232, -51084.838301, 53731.803175, -0.036998, 0.045634, 8.590794, 13.694592, 1.395803, 111.703074, -103.537175],
  [2025.5, 8, -52, -75, 14.91, -49.63, 20005.506364, 19331.857134, 5147.774727, -23532.664273, 30886.996822, -0.098427, -0.028885, -58.502212, -47.688987, -48.263512, 44.775999, -72.006513],
  [2025.5, 8, -66, 17, -33.14, -59.55, 18154.870136, 15201.438652, -9925.501123, -30881.123197, 35822.382382, -0.112991, 0.041932, 10.080437, -11.133189, -35.489343, 34.582697, -24.703647],
  [2025.5, 22, -37, 140, 9.28, -68.62, 21688.84759, 21404.761773, 3498.89743, -55397.58776, 59492.006517, 0.028818, 0.004094, 0.393984, -1.37102, 10.829532, 10.653875, -9.77701],
  [2025.5, 40, -12, -129, 10.76, -15.46, 29105.866326, 28594.451238, 5432.201489, -8052.525092, 30199.248583, -0.009568, 0.030404, -39.188467, -37.592705, -12.089297, 27.469404, -45.094246],
  [2025.5, 44, 33, -118, 11.1, 57.89, 23678.743422, 23235.83585, 4558.379362, 37727.715752, 44542.826874, -0.075717, -0.021971, -41.700619, -34.896682, -38.734089, -98.57311, -105.659134],
  [2025.5, 50, -81, -67, 28.13, -67.61, 18292.84272, 16132.682326, 8623.494405, -44412.283868, 48032.062762, -0.099291, 0.019879, -12.853806, 3.608124, -34.016532, 74.964128, -74.210029],
  [2026.0, 74, -57, 3, -22.51, -58.65, 14362.206593, 13268.119649, -5498.179626, -23576.062921, 27606.226129, -0.037845, 0.082339, 12.94561, 8.327751, -13.719801, 55.005355, -40.240277],
  [2026.0, 46, -24, -122, 14.01, -34.17, 26638.50009, 25846.118652, 6448.863284, -18080.399376, 32194.883578, 0.000271, 0.019932, -40.514451, -39.339842, -9.685735, 41.034418, -56.566841],
  [2026.0, 69, 23, 63, 1.17, 35.92, 34565.858527, 34558.605297, 708.078839, 25043.405885, 42684.54936, 0.013234, 0.010624, 23.857027, 23.688475, 8.470762, 27.058242, 35.194683],
  [2026.0, 33, -3, -147, 9.71, -2.12, 30957.666082, 30514.086409, 5221.840663, -1146.978999, 30978.906535, -0.006185, 0.036855, -36.361404, -35.276692, -9.427361, 21.287924, -37.124648],
  [2026.0, 47, -72, -22, -6.32, -61.16, 18392.516222, 18280.800055, -2024.10532, -33397.48616, 38127.112857, -0.048225, 0.01733, -15.939764, -17.546607, -13.632509, 52.849287, -53.982732],
  [2026.0, 62, -14, 99, -1.43, -44.7, 33448.275663, 33437.82863, -835.919473, -33100.922253, 47058.03012, 0.0614, 0.07248, 38.755947, 39.639639, 34.864408, 45.397052, -4.385324],
  [2026.0, 83, 86, -46, -30.61, 86.84, 3000.255301, 2582.099403, -1527.839829, 54279.308437, 54362.16383, 1.221388, -0.002547, 3.280093, 35.392266, 53.372894, 15.551936, 15.709262],
  [2026.0, 82, -64, 87, -81.74, -75.4, 13974.248411, 2007.07487, -13829.362571, -53663.514288, 55453.154865, -0.18726, -0.029553, -23.144309, -48.522801, 16.344602, -24.623137, 17.996086],
  [2026.0, 34, -19, 43, -14.98, -52.33, 20212.448819, 19525.69405, -5224.017527, -26182.86233, 33076.961273, -0.1357, 0.023383, 51.024088, 36.91785, -59.432251, -44.004821, 66.012531],
  [2026.0, 56, -81, 40, -59.77, -68.45, 17877.818542, 9000.536024, -15446.90089, -45267.890393, 48670.301997, -0.146798, 0.017031, -1.33047, -40.246526, -21.910829, 42.754262, -40.25414],
  [2026.5, 14, 0, 80, -3.1, -17.15, 39489.089663, 39431.415992, -2133.456168, -12188.838466, 41327.424134, 0.056431, 0.021103, 33.618195, 35.670346, 37.019904, 5.553327, 30.484922],
  [2026.5, 12, -82, -68, 29.79, -68.07, 18497.480257, 16052.819558, 9190.416754, -45940.146795, 49524.275496, -0.104864, 0.021236, -11.118018, 7.171828, -34.904116, 76.756556, -75.354213],
  [2026.5, 44, -46, -42, -11.36, -54.39, 14140.316272, 13863.176808, -2785.834358, -19744.304022, 24285.511845, 0.039043, -0.119143, -63.277988, -60.139435, 21.913412, 1.623579, -38.163791],
  [2026.5, 43, 17, 52, 1.19, 23.95, 36002.676553, 35994.907968, 747.876551, 15990.895993, 39394.180708, -0.010785, 0.016571, 20.35104, 20.487426, -6.352799, 21.505886, 27.328663],
  [2026.5, 64, 10, 78, -1.53, 7.53, 39441.702532, 39427.72448, -1049.971869, 5214.811025, 39784.948821, 0.031231, 0.021184, 27.794943, 28.357414, 20.751458, 18.512565, 29.981674],
  [2026.5, 12, 33, -145, 11.96, 52.51, 24672.289649, 24136.839639, 5112.225422, 32162.934508, 40536.110231, -0.08662, 0.00034, -40.973255, -32.355349, -44.980044, -53.017362, -67.004405],
  [2026.5, 12, -79, 115, -137.58, -77.37, 13023.480845, -9613.650418, -8785.714482, -58104.306533, 59545.961164, -0.241722, 0.014808, 7.471685, -42.581077, 35.51814, 37.027107, -34.496496],
  [2026.5, 14, -33, -114, 18.12, -44.1, 24613.183584, 23393.133584, 7653.110952, -23854.293436, 34275.882505, -0.000322, 0.022971, -42.803882, -40.639067, -13.440897, 60.620545, -72.925914],
  [2026.5, 19, 29, 66, 2.24, 46.04, 32749.959268, 32725.000691, 1278.34338, 33958.454002, 47177.71116, 0.018224, 0.011101, 23.712541, 23.287876, 11.334193, 37.754815, 43.636705],
  [2026.5, 86, -11, 167, 10.24, -31.6, 33105.255278, 32578.377044, 5882.794932, -20368.224196, 38869.300019, 0.013426, -0.025948, -16.653141, -17.766581, 4.674631, -10.422224, -8.722161],
  [2027.0, 37, -66, -5, -17.22, -59.04, 17159.8365, 16390.771268, -5079.626554, -28608.243575, 33360.029814, -0.04363, 0.039964, -2.074991, -5.850093, -11.867216, 48.69553, -42.826703],
  [2027.0, 67, 72, -115, 13.73, 84.84, 5026.868699, 4883.287833, 1192.857435, 55689.615237, 55916.032175, -0.315901, -0.072636, 66.581032, 71.25614, -11.124661, -50.889259, -44.697541],
  [2027.0, 44, 22, 174, 6.46, 31.89, 28867.487799, 28683.97251, 3249.857362, 17961.198575, 33999.066253, -0.024375, -0.000168, 2.815221, 4.179894, -11.885941, 1.634357, 3.253718],
  [2027.0, 54, 54, 178, 0.63, 65.46, 20617.099795, 20615.871559, 225.041793, 45149.631876, 49634.202547, -0.170729, 0.012944, -3.909066, -3.238256, -61.473597, 18.434524, 15.145168],
  [2027.0, 57, -43, 50, -48.27, -63.13, 16833.417225, 11203.748204, -12563.437494, -33221.366617, 37242.759503, -0.165742, -0.033376, 12.323002, -28.141121, -41.606787, -72.317297, 70.078525],
  [2027.0, 44, -43, -111, 24.31, -52.57, 22462.470699, 20471.522067, 9245.50562, -29347.556906, 36957.295441, -0.006299, 0.024728, -40.058633, -35.491603, -18.738696, 78.579889, -86.747247],
  [2027.0, 12, -63, 178, 57.87, -79.14, 11720.691727, 6233.774935, 9925.455386, -61075.730989, 62190.188377, 0.151793, 0.036783, 27.353301, -11.747306, 39.678751, 69.308326, -62.911163],
  [2027.0, 38, 27, -169, 8.48, 42.66, 26106.758229, 25821.061601, 3851.701313, 24058.365347, 35501.658671, -0.058765, 0.013094, -19.135886, -14.976028, -29.306273, -6.601488, -18.545527],
  [2027.0, 61, 59, -77, -16.48, 78.68, 10884.812802, 10437.775689, -3087.391846, 54397.713552, 55476.03437, 0.230418, -0.074136, 59.669126, 69.634646, 25.051419, -67.643997, -54.621632],
  [2027.0, 67, -47, -32, -13.52, -57.98, 12805.786103, 12450.832543, -2994.148743, -20475.298079, 24150.072239, 0.11555, -0.077078, -52.470761, -44.977997, 37.378183, 22.62727, -47.00729],
  [2027.5, 8, 62, 53, 19.39, 76.67, 12997.751893, 12260.425578, 4315.497527, 54849.810218, 56368.814385, 0.099601, 0.030088, -12.884268, -19.655269, 17.035218, 74.003425, 69.038304],
  [2027.5, 77, -68, -7, -16.19, -59.82, 17262.817301, 16578.099495, -4813.676173, -29680.383821, 34335.550744, -0.048399, 0.032649, -5.108702, -8.972297, -12.579376, 47.699056, -43.800575],
  [2027.5, 98, -5, 159, 7.79, -23.22, 33857.496691, 33544.960996, 4589.735713, -14525.780052, 36841.937629, -0.005671, -0.036102, -11.751062, -11.188278, -4.913401, -20.218524, -2.827531],
  [2027.5, 34, -29, -107, 15.64, -37.45, 24446.053109, 23540.396213, 6592.363667, -18723.097084, 30792.269761, -0.017007, 0.030517, -44.335923, -40.736596, -18.943541, 54.61513, -68.406867],
  [2027.5, 60, 27, 65, 1.85, 42.83, 33079.422542, 33062.159421, 1068.555172, 30667.425573, 45108.083389, 0.016699, 0.011093, 23.388908, 23.065275, 10.391374, 33.592654, 39.990433],
  [2027.5, 73, -72, 95, -102.64, -76.49, 13306.747292, -2912.418045, -12984.118939, -55399.217725, 56974.931751, -0.235287, -0.006801, -8.44255, -51.471801, 20.197772, 6.191978, -7.992526],
  [2027.5, 96, -46, -85, 17.93, -47.37, 19914.457641, 18947.658009, 6129.590452, -21631.434316, 29402.458634, -0.091418, -0.005439, -53.229644, -40.865392, -46.615842, 53.698344, -75.558704],
  [2027.5, 0, -13, -59, -17.49, -15.26, 22401.49301, 21365.849306, -6732.56062, -6112.31352, 23220.406233, -0.17369, -0.38568, -68.873971, -86.099325, -44.070217, -143.226783, -28.743372],
  [2027.5, 16, 66, -178, 0.37, 75.67, 13821.614337, 13821.326215, 89.244328, 54092.646409, 55830.559897, -0.327448, 0.003026, -1.280867, -0.770805, -78.997758, 6.899408, 6.367545],
  [2027.5, 72, -87, 38, -65.44, -70.97, 16661.696834, 6926.051596, -15153.941754, -48295.635435, 51088.94737, -0.14831, 0.02134, 0.540463, -39.00136, -18.41966, 56.777921, -53.4973],
  [2028.0, 49, 20, 167, 5.1, 26.82, 30251.262453, 30131.436134, 2689.876669, 15295.611788, 33898.298187, -0.020383, -0.011359, 9.497816, 10.417136, -9.874921, -2.728173, 7.244961],
  [2028.0, 71, 5, -13, -6.47, -17.66, 28323.200567, 28142.647915, -3192.970202, -9017.928693, 29724.177504, 0.166481, -0.073692, -18.125869, -8.732692, 83.815865, -34.350117, -6.850172],
  [2028.0, 95, 14, 65, -0.51, 17.44, 36933.940251, 36932.466767, -329.910612, 11601.180703, 38713.089985, 0.011924, 0.011881, 29.013291, 29.080794, 7.427118, 17.527263, 32.932326],
  [2028.0, 86, -85, -79, 41.09, -70.25, 16867.459172, 12713.115116, 11085.480728, -46988.258092, 49924.018042, -0.121705, 0.024621, -3.420695, 20.969078, -29.252744, 73.02543, -69.886927],
  [2028.0, 30, -36, -64, -4.65, -40.08, 17398.651081, 17341.333537, -1411.102609, -14639.967305, 22738.551012, -0.162162, -0.152944, -69.721104, -73.485198, -43.42573, -20.660569, -40.045784],
  [2028.0, 75, 79, 125, -18.59, 87.42, 2582.332595, 2447.5959, -823.235047, 57308.751756, 57366.902212, -0.910648, 0.022931, -21.221891, -33.198946, -32.13617, 39.08266, 38.087754],
  [2028.0, 21, 6, -32, -14.34, -8.7, 28453.070088, 27567.09426, -7045.034525, -4352.046687, 28783.980055, 0.17796, -0.31147, -29.041854, -6.255704, 92.814073, -153.852374, -5.445988],
  [2028.0, 1, -76, -75, 29.87, -65.23, 19597.63521, 16993.742946, 9761.147808, -42479.84725, 46782.525885, -0.086171, 0.016127, -22.854241, -5.137167, -36.941289, 80.971555, -83.0983],
  [2028.0, 45, -46, -41, -11.68, -54.96, 13897.562372, 13609.973828, -2812.623735, -19816.196211, 24203.798713, 0.048411, -0.117246, -62.721602, -59.047199, 24.193263, 3.174357, -38.612991],
  [2028.0, 11, -22, -21, -23.24, -57.67, 13528.270036, 12430.606447, -5337.987778, -21373.837958, 25295.35608, 0.176027, -0.19656, -92.571749, -68.660974, 74.716931, -16.002042, -35.98726],
  [2028.5, 28, 54, -120, 15.43, 73.74, 15286.094495, 14735.145798, 4066.959949, 52393.678137, 54578.03765, -0.147623, -0.053732, 20.801434, 30.530225, -32.430768, -111.448817, -101.162318],
  [2028.5, 68, -58, 156, 41.57, -81.52, 9282.943032, 6944.959164, 6159.591995, -62264.415929, 62952.605366, 0.218259, 0.014957, 11.274695, -15.02895, 33.936954, 35.824068, -33.769886],
  [2028.5, 39, -65, -88, 29.45, -60.2, 20609.270068, 17946.905687, 10131.662696, -35982.872979, 41466.964689, -0.076076, 0.014457, -36.693634, -18.500934, -41.868201, 85.117374, -92.097328],
  [2028.5, 27, -23, 81, -13.27, -58.58, 25625.329284, 24940.672257, -5883.907569, -41948.733657, 49156.421313, 0.129297, -0.007968, 18.629651, 31.409843, 52.004836, -43.610533, 46.927695],
  [2028.5, 11, 34, 0, 1.57, 46.77, 29089.194286, 29078.234597, 798.434048, 30945.577813, 42471.284539, 0.111314, 0.010464, 15.380882, 13.823891, 56.915296, 27.686933, 30.707939],
  [2028.5, 72, -62, 65, -67.87, -68.5, 17434.847799, 6567.891205, -16150.440331, -44267.327811, 47576.992646, -0.176819, -0.022421, -7.894025, -52.815238, -12.956527, -30.762466, 25.729685],
  [2028.5, 55, 86, 70, 67.64, 87.57, 2370.361097, 901.741754, 2192.139033, 55926.154052, 55976.36393, 1.341225, 0.014915, -13.210618, -56.340956, 8.891342, 32.41574, 31.82725],
  [2028.5, 59, 32, 163, 0.15, 43.1, 28217.204381, 28217.104175, 75.200106, 26405.862611, 38645.571587, -0.043407, 0.005164, 13.00012, 13.057045, -21.342658, 16.9364, 21.064439],
  [2028.5, 65, 48, 148, -9.55, 61.79, 23693.546804, 23365.16701, -3931.047029, 44177.553125, 50130.233993, -0.040524, 0.019409, 4.495479, 1.652822, -17.271572, 44.310648, 41.173752],
  [2028.5, 95, 30, 28, 4.56, 44.27, 29786.406936, 29692.133298, 2367.965026, 29039.808439, 41599.765773, 0.034245, 0.035803, 8.349023, 6.90731, 18.410171, 44.444119, 37.00348],
  [2029.0, 95, -60, -59, 8.58, -55.17, 18095.598879, 17893.018948, 2700.105868, -26011.845842, 31687.013474, -0.053323, -0.035373, -49.689333, -46.620155, -24.066802, 37.170306, -58.889314],
  [2029.0, 95, -70, 42, -55.06, -64.54, 18202.66048, 10426.249753, -14920.796381, -38237.047006, 42348.655378, -0.157751, 0.012766, 3.604264, -39.016467, -31.660684, 14.381378, -11.435882],
  [2029.0, 50, 87, -154, -73.48, 89.07, 906.920459, 257.87742, -869.484879, 55992.308183, 55999.652503, 1.562405, -0.064156, 62.930173, 41.603892, -53.300475, 13.406039, 14.423442],
  [2029.0, 58, 32, 19, 4.11, 46.03, 29434.989012, 29359.395781, 2108.18821, 30508.465542, 42393.219362, 0.056569, 0.028397, 10.5931, 8.484435, 29.745872, 41.240139, 37.03378],
  [2029.0, 57, 34, -13, -1.89, 45.74, 28257.277809, 28241.863242, -933.225495, 28997.458189, 40488.595068, 0.154151, -0.026819, 21.195169, 23.694393, 75.28301, -5.404499, 10.92162],
  [2029.0, 38, -76, 49, -64.28, -67.36, 18412.640681, 7991.121323, -16588.167977, -44151.303941, 47836.837024, -0.160186, 0.012467, -0.041101, -46.394534, -22.304306, 27.140173, -25.06501],
  [2029.0, 49, -50, -179, 32.11, -71.33, 18080.59379, 15315.042731, 9610.272521, -53522.651338, 56494.088877, 0.110906, 0.012602, -5.111774, -22.932228, 26.927867, 53.95627, -52.754307],
  [2029.0, 90, -55, -171, 38.65, -72.79, 16416.538468, 12821.507915, 10252.398258, -52995.143972, 55479.618058, 0.117199, 0.024083, 2.622098, -18.923406, 27.863957, 70.344114, -66.418097],
  [2029.0, 41, 42, -19, -4.13, 56.44, 24503.475397, 24439.977735, -1762.893879, 36929.897501, 44319.720622, 0.180959, -0.034375, 24.712482, 30.216258, 75.411786, -10.849192, 4.622821],
  [2029.0, 19, 46, -22, -5.65, 60.89, 22632.016516, 22522.142232, -2227.39329, 40651.688191, 46527.066578, 0.196585, -0.034725, 25.397648, 32.916674, 74.775309, -12.351198, 1.562595],
  [2029.5, 31, 13, -132, 9.04, 31.41, 28145.022897, 27795.620707, 4421.061344, 17187.98359, 32978.312476, -0.039071, 0.025976, -57.60425, -53.874337, -28.002848, -17.659477, -58.365744],
  [2029.5, 93, -2, 158, 7.09, -17.84, 34067.30102, 33806.520595, 4207.156292, -10964.647547, 35788.329028, -0.010065, -0.038403, -8.149803, -7.348347, -6.945244, -22.576489, -0.841015],
  [2029.5, 51, -76, 40, -56.34, -66.22, 18517.441118, 10263.650094, -15412.758102, -42018.541264, 45917.898858, -0.148779, 0.015688, 0.140771, -39.943896, -26.768531, 30.856345, -28.179249],
  [2029.5, 64, 22, -132, 10.23, 43.76, 26014.780783, 25601.266218, 4619.955329, 24914.378368, 36020.758857, -0.057237, 0.010172, -55.619345, -50.120044, -35.452393, -44.412257, -70.887703],
  [2029.5, 26, -65, 55, -63.48, -65.71, 18695.741849, 8347.198524, -16728.868464, -41431.528035, 45454.397791, -0.179396, -0.005003, 1.416835, -51.746426, -27.403316, -12.788863, 12.23976],
  [2029.5, 66, -21, 32, -14.63, -56.68, 16100.322907, 15578.335534, -4066.430831, -24494.877642, 29312.444941, -0.198629, 0.076846, 37.723336, 22.403071, -63.533684, 14.184486, 8.866905],
  [2029.5, 18, 9, -172, 9.24, 15.85, 30922.51441, 30520.999126, 4966.941695, 8779.472279, 32144.689001, -5.3e-05, 0.016657, -17.13715, -16.910013, -2.781046, 4.848633, -15.161302],
  [2029.5, 63, 88, 26, 36.52, 87.37, 2539.900024, 2041.140972, 1511.567287, 55286.620082, 55344.931586, 1.375737, 0.002257, -1.029565, -37.121853, 48.397411, 25.084712, 25.011033],
  [2029.5, 33, 17, 5, 0.89, 13.77, 34026.126581, 34021.976056, 531.446418, 8341.137769, 35033.582023, 0.078642, 0.026998, 3.099752, 2.369935, 46.745426, 17.756374, 7.238224],
  [2029.5, 77, -18, 138, 4.45, -47.55, 31847.600506, 31751.49758, 2472.257962, -34817.395113, 47186.021876, -0.03658, 0.012491, 0.895474, 2.471158, -20.201885, 14.262673, -9.919684]
];

module.exports = {
  gnmWmm,
  hnmWmm,
  gtnmWmm,
  htnmWmm,
  julianDaysCOF,
  testData
};