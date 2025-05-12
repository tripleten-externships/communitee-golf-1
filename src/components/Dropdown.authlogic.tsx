// useEffect(() => {
//     if (!isLoggedIn) return;
  
//     // chrome.storage.local.get([AUTH_TOKEN_KEY], async (result) => {
//     //   const token = result[AUTH_TOKEN_KEY];

//     const storage = (window as any ).chrome?.storage?.local;
//     if(!storage) {
//       console.warn("chrome.storage.local not available-skipping location load");
//       return;
//     }

//     storage.get([AUTH_TOKEN_KEY], async(result: Record<string, any> )=> {
//       const token = result [AUTH_TOKEN_KEY];
//       console.log("Token used for API call:", token);
    
  
//       if (!token) {
//         console.warn("No token in chrome.storage.local");
//         return;
//       }
  
//       try {
//         const data = await getLocations(token);
//         console.log("Location data received:", data);
//         const names = data.map((loc: { name: string }) => loc.name);
//         setCourse(names);
//       } catch (error) {
//         console.error("Failed to load locations", error);
//       }
//     });

// export const getLocations = async (token: string) => {
//     const response = await request (`${baseUrl}/location`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, 
//         },
//     });
//     if (!response.ok) {
//         throw new Error("Authentication token required");
//       }

//       return await response.json();
// }