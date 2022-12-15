package com.fitchwiframe.fitchwiserver.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "report")
public class Report {
    @Id
    private long reportCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column(nullable = false, length = 20)
    private String reportTarget;

    @Column(nullable = false, length = 10)
    private String reportCategory;

    @Column(nullable = false, length = 200)
    private String reportContent;

    @Column(nullable = false, length = 50)
    private String reportDate;
}
