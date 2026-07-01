'use client';

import React, { useState } from 'react';
import { Table, Button, Tooltip, Chip } from '@heroui/react';
import { Check, Xmark, Calendar } from '@gravity-ui/icons';

export default function LawyerHiringHistory() {
  // Localized data array simulating direct incoming database context
  const [hiringRequests, setHiringRequests] = useState([
    {
      _id: 'hr-req-001',
      clientName: 'David Miller',
      clientPhotoURL: 'https://picsum.photos/400/400?random=30',
      caseCategory: 'Family Law Consultation',
      requestDate: '2026-06-28T14:30:00.000Z',
      status: 'pending',
    },
    {
      _id: 'hr-req-002',
      clientName: 'Sophia Moreno',
      clientPhotoURL: 'https://picsum.photos/400/400?random=31',
      caseCategory: 'Child Custody Representation',
      requestDate: '2026-06-29T09:15:00.000Z',
      status: 'pending',
    },
    {
      _id: 'hr-req-003',
      clientName: 'Jonathan Vance',
      clientPhotoURL: 'https://picsum.photos/400/400?random=32',
      caseCategory: 'Prenuptial Agreement Vetting',
      requestDate: '2026-06-25T11:00:00.000Z',
      status: 'accepted',
    },
  ]);

  // Handle Request Authorization (Accept)
  const handleAcceptRequest = (id) => {
    setHiringRequests((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: 'accepted' } : item))
    );
    console.log('Hiring contract verified and initialized for registration ID:', id);
  };

  // Handle Request Revocation (Reject)
  const handleRejectRequest = (id) => {
    setHiringRequests((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: 'rejected' } : item))
    );
    console.log('Hiring contract declined for reference ID:', id);
  };

  // Determines color formatting for the client request status column
  const getStatusChipProperties = (status) => {
    switch (status) {
      case 'accepted':
        return { color: 'success', variant: 'flat' };
      case 'rejected':
        return { color: 'danger', variant: 'flat' };
      default:
        return { color: 'warning', variant: 'flat' };
    }
  };

  const formatRequestDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6 bg-background">
      {/* Route Dashboard Context Block */}
      <div className="pb-4 border-b border-divider">
        <h1 className="text-xl font-bold tracking-tight text-foreground">Hiring Requests</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review client consultation submissions, manage contract approvals, and filter case
          assignment history.
        </p>
      </div>

      {/* HeroUI v3 Collection Layout Table */}
      <Table
        variant="primary"
        className="w-full border border-divider rounded-xl overflow-hidden shadow-3xs"
      >
        <Table.ScrollContainer>
          <Table.Content aria-label="Inbound client retainer legal requests inventory ledger">
            <Table.Header>
              <Table.Column className="w-[35%]">Client Profile</Table.Column>
              <Table.Column className="w-[20%]">Requested Service</Table.Column>
              <Table.Column className="w-[20%]">Submission Date</Table.Column>
              <Table.Column className="w-[13%]">Status</Table.Column>
              <Table.Column className="w-[12%] text-center">Decision Controls</Table.Column>
            </Table.Header>

            {/* Core Safe Loop Callback Mapping Engine */}
            <Table.Body
              items={hiringRequests}
              renderEmptyState={() => (
                <div className="text-center py-14 text-muted-foreground text-xs font-medium">
                  No pending or historic legal retainer requests detected for this account profile.
                </div>
              )}
            >
              {(request) => (
                <Table.Row
                  key={request._id}
                  className="border-b border-divider/40 last:border-0 hover:bg-default-50 transition-colors"
                >
                  {/* Column 1: Client Demographics & Information */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <img
                        src={request.clientPhotoURL}
                        alt={request.clientName}
                        className="w-9 h-9 rounded-full object-cover bg-muted border border-divider shrink-0 shadow-3xs"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-foreground tracking-tight">
                          {request.clientName}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                          ID: {request._id.slice(-6)}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Column 2: Legal Service Subcategory Target */}
                  <Table.Cell>
                    <span className="text-xs font-semibold text-foreground">
                      {request.caseCategory}
                    </span>
                  </Table.Cell>

                  {/* Column 3: Chronological System Date */}
                  <Table.Cell>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar width={12} height={12} className="text-default-400 shrink-0" />
                      <span className="text-xs font-medium text-default-600">
                        {formatRequestDate(request.requestDate)}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Column 4: Managed State Visualizer */}
                  <Table.Cell>
                    <Chip
                      size="sm"
                      color={getStatusChipProperties(request.status).color}
                      variant={getStatusChipProperties(request.status).variant}
                      className="capitalize font-bold text-[10px] border-none tracking-wide h-5"
                    >
                      {request.status}
                    </Chip>
                  </Table.Cell>

                  {/* Column 5: Binary Action Matrix Operations */}
                  <Table.Cell>
                    <div className="flex items-center justify-center gap-1">
                      {/* Check/Accept Action Control */}
                      <Tooltip content="Accept Hiring Request" color="success" closeDelay={0}>
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          disabled={request.status !== 'pending'}
                          className={`rounded-lg transition-all bg-transparent border border-transparent ${
                            request.status === 'pending'
                              ? 'text-default-400 hover:text-success hover:bg-success/10 hover:border-success/20'
                              : 'text-default-200 cursor-not-allowed'
                          }`}
                          onPress={() => handleAcceptRequest(request._id)}
                        >
                          <Check width={15} height={15} />
                        </Button>
                      </Tooltip>

                      {/* Cancel/Reject Action Control */}
                      <Tooltip content="Decline Request" color="danger" closeDelay={0}>
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          disabled={request.status !== 'pending'}
                          className={`rounded-lg transition-all bg-transparent border border-transparent ${
                            request.status === 'pending'
                              ? 'text-default-400 hover:text-danger hover:bg-danger/10 hover:border-danger/20'
                              : 'text-default-200 cursor-not-allowed'
                          }`}
                          onPress={() => handleRejectRequest(request._id)}
                        >
                          <Xmark width={14} height={14} />
                        </Button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
