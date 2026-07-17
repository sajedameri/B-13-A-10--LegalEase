// import Link from 'next/link';
// import { Card, Avatar, Chip, Button } from '@heroui/react';
// import { CircleDollar } from '@gravity-ui/icons';

// export default function LawyerCard({ lawyer }) {
//   return (
//     <Card className="p-5 hover:shadow-xl transition-all duration-300 border">
//       <div className="flex justify-between items-start">
//         <Avatar src={lawyer.photoURL} className="w-20 h-20" />

//         {lawyer.isBusy && (
//           <Chip color="danger" variant="solid">
//             Busy
//           </Chip>
//         )}
//       </div>

//       <Card.Header className="px-0 pt-5">
//         <div>
//           <Card.Title className="text-xl">{lawyer.name}</Card.Title>

//           <Card.Description>{lawyer.specialization}</Card.Description>
//         </div>
//       </Card.Header>

//       <Card.Body className="px-0 py-4 space-y-3">
//         <div className="flex items-center gap-2">
//           <CircleDollar className="text-success" />
//           <span className="font-semibold">${lawyer.hourlyRate}/hour</span>
//         </div>

//         <p className="text-sm text-default-500 line-clamp-3">{lawyer.bio}</p>

//         <div className="flex justify-between">
//           <Chip color="warning" variant="flat">
//             ⭐ {lawyer.rating}
//           </Chip>

//           <Chip color="primary" variant="flat">
//             {lawyer.experience} Years
//           </Chip>
//         </div>
//       </Card.Body>

//       <Card.Footer className="px-0">
//         <Button as={Link} href={`/lawyers/${lawyer._id}`} color="primary" fullWidth>
//           View Details
//         </Button>
//       </Card.Footer>
//     </Card>
//   );
// }
