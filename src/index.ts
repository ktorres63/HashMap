import { HashMap } from "./HashMap.ts"; 

const map = new HashMap();

map.set("apple", "red");
map.set("banana", "yellow");
map.set("apple", "green"); 

// Probar get()
console.log("apple:", map.get("apple"));   // ✅ "green"
console.log("banana:", map.get("banana")); // ✅ "yellow"
console.log("carrot:", map.get("carrot")); // ✅ null

console.log( map.has("apple"));
console.log( map.remove("apple"));
console.log("apple:", map.get("apple"));   

console.log( map.length());


console.log("Buckets:", map);
map.clear()
console.log("Buckets:", map);
