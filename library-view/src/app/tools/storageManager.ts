export class StorageManager {
  options = {
    useSession: true
  };

  constructor(options){
    this.options = Object.assign(this.options, options);
  }

  add(key:string, data:string) {
    let storage = this.getStorage();

    storage.setItem(key, data);
  }

  getStorage() {
    return this.options.useSession ? sessionStorage: localStorage
  }

  getStorageItem(key:string) {
    return this.getStorage().getItem(key);
  }
}
