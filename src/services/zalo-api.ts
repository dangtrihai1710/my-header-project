interface ContactOAParams {
  oaType: string;
  oaId: string;
}

export const contactOA = (params: ContactOAParams): void => {
  console.log('Contact OA called with params:', params);
  // Mock implementation
};