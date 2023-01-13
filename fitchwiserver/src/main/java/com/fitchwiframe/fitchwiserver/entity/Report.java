package com.fitchwiframe.fitchwiserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "report")
@DynamicInsert
public class Report {

    @Id
    private long reportCode = System.currentTimeMillis();

    @ManyToOne
    @JoinColumn(name = "memberEmail")
    private Member memberEmail;

    @Column( length = 20)
    private Long reportTarget;

    @Column(nullable = false, length = 10)
    private String reportCategory;

    @Transient
    private List<ReportDetail> reportDetailList;

    @Column(columnDefinition = "varchar(30) default '처분 대기'")
    private String reportState;

    @Column( columnDefinition = "bigint default '1'")
    private Long reportedCount;
}
