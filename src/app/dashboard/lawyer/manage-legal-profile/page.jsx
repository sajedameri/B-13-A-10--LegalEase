"use client";

import React, { useState } from "react";
import { Table, Button, Tooltip, Chip } from "@heroui/react";
import { Pencil, TrashBin, Eye, SquarePlus } from "@gravity-ui/icons";

export default function ManageLegalServices() {
  // Collection state containing the lawyer's specific service offerings
  const [myServices, setMyServices] = useState([
    {
      _id: "srv-001",
      name: "Initial Divorce & Separation Consultation",
      specialization: "Family Law",
      fee: 75,
      bio: "Comprehensive initial evaluation of marital assets, structural separation pathways, and preliminary rights analysis.",
      imageUrl: "https://picsum.photos/400/400?random=20",
      status: "active"
    },
    {
      _id: "srv-002",
      name: "Child Custody & Mediation Representation",
      specialization: "Family Law",
      fee: 95,
      bio: "Dedicated legal advocacy focused on securing fair visitation matrix setups and parental rights preservation.",
      imageUrl: "https://picsum.photos/400/400?random=21",
      status: "active"
    },
    {
      _id: "srv-003",
      name: "Prenuptial Agreement Drafting & Vetting",
      specialization: "Asset Protection",
      fee: 120,
      bio: "Meticulous structural drafting of pre-marital asset declarations and legally binding protection clauses.",
      imageUrl: "https://picsum.photos/400/400?random=22",
      status: "inactive"
    }
  ]);

  // Operational Action Routing Handlers
  const handleViewDetails = (id) => {
    console.log("Redirecting to profile card preview mode for service:", id);
  };

  const handleEditService = (id) => {
    console.log("Opening service modification workspace modal for:", id);
  };

  const handleDeleteService = (id) => {
    setMyServices((prev) => prev.filter((item) => item._id !== id));
    console.log("Deleted service item configuration from roster:", id);
  };

  // Maps custom service visibility rules directly to semantic tokens
  const getStatusChipColor = (status) => {
    return status === "active" ? "success" : "default";
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6 bg-background">
      
      {/* Dynamic Sub-Route Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-divider">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Manage Offerings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure the direct legal offerings, hourly billing scales, and photos visible on your public details profile page.
          </p>
        </div>
        <Button 
          variant="primary" 
          size="sm"
          className="bg-primary text-primary-foreground font-medium flex items-center gap-1.5 self-start sm:self-center"
          onPress={() => console.log("Open create service modal configuration sheet")}
        >
          <SquarePlus width={14} height={14} />
          Create Service
        </Button>
      </div>

      {/* HeroUI Secure Virtualized Data Engine Table */}
      <Table variant="primary" className="w-full border border-divider rounded-xl overflow-hidden shadow-2xs">
        <Table.ScrollContainer>
          <Table.Content aria-label="Lawyer profile individual services management matrix">
            <Table.Header>
              <Table.Column className="w-[40%]">Service Offering</Table.Column>
              <Table.Column className="w-[20%]">Specialization</Table.Column>
              <Table.Column className="w-[15%]">Hourly Fee</Table.Column>
              <Table.Column className="w-[12%]">Status</Table.Column>
              <Table.Column className="w-[13%] text-center">Actions</Table.Column>
            </Table.Header>

            {/* Collection Registry Implementation Callback */}
            <Table.Body 
              items={myServices}
              renderEmptyState={() => (
                <div className="text-center py-14 text-muted-foreground text-xs font-medium">
                  You have not published any active legal service packages yet. Click Create Service to start.
                </div>
              )}
            >
              {(service) => (
                <Table.Row key={service._id} className="border-b border-divider/40 last:border-0 hover:bg-default-50 transition-colors">
                  
                  {/* Column 1: Core Service Identity Setup (Combined Image + Title + Partial Bio Preview) */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={service.imageUrl} 
                        alt={service.name} 
                        className="w-10 h-10 rounded-lg object-cover bg-muted border border-divider shrink-0 shadow-3xs"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150";
                        }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-sm text-foreground truncate max-w-xs sm:max-w-md">
                          {service.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5 max-w-xs sm:max-w-sm">
                          {service.bio}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Column 2: Legal Specialty Target Area */}
                  <Table.Cell>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-default-100 text-default-700 border border-default-200">
                      {service.specialization}
                    </span>
                  </Table.Cell>

                  {/* Column 3: Billing Rate Format */}
                  <Table.Cell>
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-mono text-sm font-bold text-foreground">${service.fee}</span>
                      <span className="text-[11px] text-muted-foreground">/hr</span>
                    </div>
                  </Table.Cell>

                  {/* Column 4: Contextual Profile Status Column */}
                  <Table.Cell>
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      color={getStatusChipColor(service.status)}
                      className="capitalize font-semibold text-[11px] border-none"
                    >
                      {service.status}
                    </Chip>
                  </Table.Cell>

                  {/* Column 5: Pure Icon Action Control System Layout */}
                  <Table.Cell>
                    <div className="flex items-center justify-center gap-0.5">
                      
                      {/* Service Details Preview Trigger */}
                      <Tooltip content="View Service Details" closeDelay={0}>
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          className="text-default-400 hover:text-primary transition-colors bg-transparent hover:bg-primary/10"
                          onPress={() => handleViewDetails(service._id)}
                        >
                          <Eye width={14} height={14} />
                        </Button>
                      </Tooltip>

                      {/* Service Inline Modification Trigger */}
                      <Tooltip content="Edit Details" closeDelay={0}>
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          className="text-default-400 hover:text-warning transition-colors bg-transparent hover:bg-warning/10"
                          onPress={() => handleEditService(service._id)}
                        >
                          <Pencil width={14} height={14} />
                        </Button>
                      </Tooltip>

                      {/* Service Complete Revocation Trigger */}
                      <Tooltip content="Delete Service Package" color="danger" closeDelay={0}>
                        <Button
                          isIconOnly
                          variant="flat"
                          size="sm"
                          className="text-default-400 hover:text-danger transition-colors bg-transparent hover:bg-danger/10"
                          onPress={() => handleDeleteService(service._id)}
                        >
                          <TrashBin width={14} height={14} />
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