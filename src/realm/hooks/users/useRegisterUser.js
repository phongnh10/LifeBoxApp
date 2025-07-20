import { BSON } from 'realm';

const createItem = (realm, schemaKey, data) => {
  try {
    const id = data.id || new BSON.UUID().toString();

    realm.write(() => {
      realm.create(schemaKey, {
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return id;
  } catch (error) {
    console.error(`[Realm] Failed to create item in ${schemaKey}:`, error);
    return null;
  }
};

const updateItem = (realm, schemaKey, id, updates) => {
  try {
    const item = realm.objectForPrimaryKey(schemaKey, id);
    if (!item) {
      console.warn(
        `[Realm] No item found to update in ${schemaKey} with id: ${id}`,
      );
      return false;
    }

    realm.write(() => {
      Object.keys(updates).forEach(key => {
        item[key] = updates[key];
      });
      item.updatedAt = new Date();
    });

    return true;
  } catch (error) {
    console.error(
      `[Realm] Failed to update item in ${schemaKey} with id: ${id}`,
      error,
    );
    return false;
  }
};

const deleteItem = (realm, schemaKey, id) => {
  try {
    const item = realm.objectForPrimaryKey(schemaKey, id);
    if (!item) {
      console.warn(
        `[Realm] No item found to delete in ${schemaKey} with id: ${id}`,
      );
      return false;
    }

    realm.write(() => {
      realm.delete(item);
    });

    return true;
  } catch (error) {
    console.error(
      `[Realm] Failed to delete item in ${schemaKey} with id: ${id}`,
      error,
    );
    return false;
  }
};

const getItem = (realm, schemaKey, id) => {
  try {
    return realm.objectForPrimaryKey(schemaKey, id);
  } catch (error) {
    console.error(
      `[Realm] Failed to get item in ${schemaKey} with id: ${id}`,
      error,
    );
    return null;
  }
};

const getAllItems = (realm, schemaKey) => {
  try {
    return realm.objects(schemaKey); // Có thể thêm: [...realm.objects(schemaKey)]
  } catch (error) {
    console.error(`[Realm] Failed to get all items from ${schemaKey}`, error);
    return [];
  }
};

const baseRepository = {
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getAllItems,
};

export default baseRepository;
