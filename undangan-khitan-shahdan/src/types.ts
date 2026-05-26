/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
}

export interface GuestInfo {
  name: string;
  relation?: string;
}
