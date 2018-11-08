import 'allocator/arena'
export { allocate_memory }

import { Address, store, crypto, } from '@graphprotocol/graph-ts'

// Import event types from the Reputation contract ABI
import { OwnershipTransferred, Ownable } from '../../types/Ownable/Ownable'
import { concat, zero256, isZero } from '../../utils'

// Import entity types generated from the GraphQL schema
import { } from '../../types/schema'

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
}