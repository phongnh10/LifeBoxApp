import { BSON } from 'realm';

const createItem = (realm, schemaKey, data) => {
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
};

const updateItem = (realm, schemaKey, id, updates) => {
  const item = realm.objectForPrimaryKey(schemaKey, id);
  if (!item) return false;

  realm.write(() => {
    Object.keys(updates).forEach(key => {
      item[key] = updates[key];
    });
    item.updatedAt = new Date();
  });

  return true;
};

const deleteItem = (realm, schemaKey, id) => {
  const item = realm.objectForPrimaryKey(schemaKey, id);
  if (!item) return false;

  realm.write(() => {
    realm.delete(item);
  });

  return true;
};

const getItem = (realm, schemaKey, id) => {
  return realm.objectForPrimaryKey(schemaKey, id);
};

const getAllItems = (realm, schemaKey) => {
  return realm.objects(schemaKey);
};

const baseRepository = {
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getAllItems,
};

export default baseRepository;
