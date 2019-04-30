export default interface Image {
  name: string;
  token: string;
  size: number;
  mime: string;
  orderNo?: number;
  isActive?: boolean;
  createdAt: Date;
}
