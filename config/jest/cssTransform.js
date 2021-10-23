// SPDX-FileCopyrightText: Copyright (c) 2013-2021, Facebook, Inc.

// SPDX-License-Identifier: MIT

'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform';
  },
};
